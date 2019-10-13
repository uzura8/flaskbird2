import boom from '@hapi/boom'
import { check, query, param, validationResult } from 'express-validator'
import { db, Chat, ChatComment, User } from '@/models'
import Authenticator from '@/middlewares/passport'
import FirebaseAuth from '@/middlewares/firebase/auth'
import AwsLex from '@/middlewares/aws/lex'
import config from '@/config/config'
const isFBEnabled = config.auth.firebase.isEnabled


export default {
  isAuthenticated: (req, res, next) => {
    if (isFBEnabled) {
      FirebaseAuth.verifyToken(req, res, next)
    } else {
      Authenticator.isAuthenticated(req, res, next)
    }
  },

  isAuther: (req, res, next) => {
    Chat.findById(req.params.id)
      .then(chat => {
        if (chat) {
          if (chat.userId == req.user.id) {
            return next()
          } else {
            return next(boom.forbidden('You have no permission'))
          }
        } else {
          return next(boom.notFound('Requested id is invalid'))
        }
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
  },

  isSelf: (req, res, next) => {
    if (req.params.userId == req.user.id) {
      return next()
    } else {
      return next(boom.forbidden('You have no permission'))
    }
  },

  getChats: (req, res, next) => {
    Chat.findAll()
      .then(chats => {
        return res.json(chats)
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
  },

  getChatByUserId: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Chat.getChatByUserId(req.params.userId, req.params.type)
      .then(chats => {
        return res.json(chats)
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
  },

  getChat: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Chat.findById(req.params.id)
      .then(chat => {
        if (chat) {
          return res.json(chat)
        } else {
          return next(boom.notFound('Requested id is invalid'))
        }
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
  },

  create: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const type = req.body.type
    const name = req.body.name
    const body = req.body.body
    try {
      db.sequelize.transaction(async (t) => {
        const chat = await Chat.create({
          type: type,
          userId: req.user.id,
          name: name,
          body: body,
        })
        return res.json({
          id: chat.id,
          type: chat.type,
          userId: chat.userId,
          name: chat.name,
          body: chat.body,
        })
      })
    } catch (err) {
      return next(boom.badRequest(err))
    }
  },

  edit: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const id = req.params.id
    const name = req.body.name
    const body = req.body.body
    try {
      const result = db.sequelize.transaction(async (t) => {
        const chat = await Chat.update({
          userId: req.user.id,
          name: name,
          body: body,
        }, {
          where: {id: id}
        })
        return res.json({
          id: chat.id,
          userId: chat.userId,
          name: chat.name,
          body: chat.body,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        })
      })
    } catch (err) {
      return next(boom.badRequest(err))
    }
  },

  assignSupportChat: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const userId = req.params.userId
    const adminUserId = config.greatefulChat.support.adminUserId
    try {
      db.sequelize.transaction(async (t) => {
        const chats = await Chat.getChatByUserId(userId, 'support')
        if (chats.length > 0) return res.json(chats)

        const userAdmin = await User.findById(adminUserId)
        const chat = await Chat.create({
          type: 'support',
          userId: userId,
        })
        const chatComment = await ChatComment.create({
          chatId: chat.id,
          userId: config.greatefulChat.support.adminUserId,
          body: config.greatefulChat.support.comment.first,
        })
        const resChatComment = {
          id: chatComment.id,
          chatId: chatComment.chatId,
          userId: chatComment.userId,
          body: chatComment.body,
          user: { name:userAdmin.name }
        }
        res.io.emit(`CHAT_COMMENT_${chatComment.chatId}`, resChatComment)
        return res.json([chat])
      })
    } catch (err) {
      return next(boom.badRequest(err))
    }
  },

  getChatComments: (req, res, next) => {
    const chatId = req.params.id
    const count = req.query.count ? req.query.count : 10
    const maxId = req.query.maxId ? req.query.maxId : null
    const sinceId = req.query.sinceId ? req.query.sinceId : null
    ChatComment.findAllByChatId(chatId, count, maxId, sinceId)
      .then(comments => {
        return res.json(comments)
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
  },

  createComment: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      db.sequelize.transaction(async (t) => {
        const chatComment = await ChatComment.create({
          chatId: req.params.id,
          userId: req.user.id,
          body: req.body.body,
        })
        const user = await User.findById(req.user.id)
        const result = {
          id: chatComment.id,
          chatId: chatComment.chatId,
          userId: chatComment.userId,
          body: chatComment.body,
          user: { name:user.name }
        }
        res.io.emit(`CHAT_COMMENT_${chatComment.chatId}`, result)
        res.json(result)

        if (config.greatefulChat.isEnabled) {
          const adminUserId = config.greatefulChat.support.adminUserId
          if (result.userId != adminUserId) {
            const chat = await Chat.findById(chatComment.chatId)
            if (chat.type == 'support') {
              const adminUser = await User.findById(adminUserId)
              req.gcBot = {
                comment: result,
                sessAttrs: null,
                chat: chat,
                adminUser: adminUser,
              }
              return next()
            }
          }
        }
      })
    } catch (err) {
      return next(boom.badRequest(err))
    }
  },

  talkToChatBot: (req, res, next) => {
    if (!config.greatefulChat.isEnabled) {
      return next()
    }
    AwsLex.talkToChatBot(req, res, next)
  },


  validate: (method) => {
    switch (method) {
      case 'createChat':
        return [
          check('type')
            .customSanitizer(value => {
              const defaut = 'public'
              const accepts = ['public', 'private', 'support']
              if (!value) return defaut
              if (!accepts.includes(value)) return defaut
              return value
            }),
          check('name').trim(),
          check('body').trim(),
        ]

      case 'editChat':
        return [
          check('name', 'Name is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Name is required'),
          check('body', 'Body is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Body is required'),
        ]

      case 'comment':
        return [
          check('body', 'Comment is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Comment is required'),
        ]

      case 'getComments':
        return [
          query('count')
            .isInt({ min: 1, max: 100 }).withMessage('count is accept integer between 1 and 100'),
          query('maxId')
            .isInt({ min: 0 }).withMessage('maxId is accept positive integer'),
          query('sinceId')
            .isInt({ min: 0 }).withMessage('sinceId is accept positive integer'),
        ]

      case 'userId':
        return [
          param('userId')
            .isInt({ min: 1 }).withMessage('userId is accept integer more tha 1'),
        ]

      case 'getChatByUserId':
        return [
          param('userId')
            .isInt({ min: 1 }).withMessage('userId is accept integer more tha 1'),
          param('type')
            .trim()
            .customSanitizer(value => {
              const defaut = ''
              const accepts = ['public', 'private', 'support']
              if (!value) return defaut
              if (!accepts.includes(value)) return defaut
              return value
            }),
        ]
    }
  },
}


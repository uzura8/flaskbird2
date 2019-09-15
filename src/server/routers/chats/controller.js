import boom from '@hapi/boom'
import { check, query, validationResult } from 'express-validator'
import { db, Chat, ChatComment, User } from '@/models'
import Authenticator from '@/config/passport'

export default {
  isAuthenticated: (req, res, next) => {
    Authenticator.isAuthenticated(req, res, next)
  },

  isAuther: (req, res, next) => {
    Chat.findById(req.params.id)
      .then(chat => {
        if (chat) {
          if (chat.userId == req.user.id) {
            return next()
          } else {
            return next(boom.forbidden('You do not have edit permission'))
          }
        } else {
          return next(boom.notFound('Requested id is invalid'))
        }
      })
      .catch(err => {
        return next(boom.badImplementation(err))
      })
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

  getChat: (req, res, next) => {
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
    const name = req.body.name
    const body = req.body.body
    try {
      const result = db.sequelize.transaction(async (t) => {
        const chat = await Chat.create({
          userId: req.user.id,
          name: name,
          body: body,
        })
        return res.json({
          id: chat.id,
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

  validateCommentParams: (req, res, next) => {
    const maxId = req.query.maxId
  },

  createComment: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body.body
    try {
      const result = db.sequelize.transaction(async (t) => {
        const chatComment = await ChatComment.create({
          chatId: id,
          userId: req.user.id,
          body: body,
        })
        const user = await User.findById(req.user.id)
        return res.json({
          id: chatComment.id,
          chatId: chatComment.chatId,
          userId: chatComment.userId,
          body: chatComment.body,
          user: {name:user.name}
        })
      })
    } catch (err) {
      return next(boom.badRequest(err))
    }
  },

  validate: (method) => {
    switch (method) {
      case 'chat':
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
    }
  },
}


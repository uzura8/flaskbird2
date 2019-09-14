import boom from '@hapi/boom'
import { check, validationResult } from 'express-validator'
import { db, Chat, ChatComment } from '@/models'
import Authenticator from '@/config/passport'

export default {
  isAuthenticated: (req, res, next) => {
    Authenticator.isAuthenticated(req, res, next)
  },

  isAuther: (req, res, next) => {
    Chat.findById(req.param('id'))
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
    Chat.findById(req.param('id'))
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
    const id = req.param('id')
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

  validate: (method) => {
    switch (method) {
      case 'create':
        return [
          check('name', 'Name is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Name is required'),
          check('body', 'Body is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Body is required'),
        ]
    }
  },
}


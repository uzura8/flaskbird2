import boom from '@hapi/boom'
import { check, validationResult } from 'express-validator'
import { db, Chat, ChatComment } from '@/models'
import Authenticator from '@/config/passport'

export default {
  isAuthenticated: (req, res, next) => {
    Authenticator.isAuthenticated(req, res, next)
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
        const user = await Chat.create({
          name: name,
          body: body,
        })
        return res.json({
          id: chat.id,
          name: chat.name,
          body: chat.body,
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


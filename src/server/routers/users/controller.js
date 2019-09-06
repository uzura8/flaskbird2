import boom from '@hapi/boom'
import { check, validationResult } from 'express-validator'
import { db, User, UserAuth } from '@/models'
import str from '@/util/str'
import Authenticator from '@/config/passport'

export default {
  authenticate: (req, res, next) => {
    Authenticator.authenticate(req, res, next)
  },

  isAuthenticated: (req, res, next) => {
    Authenticator.isAuthenticated(req, res, next)
  },

  create: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      //return next(boom.badData(errors.array().shift().msg))
      return res.status(422).json({ errors: errors.array() })
    }
    const email = req.body.email
    const password = str.hashing(req.body.password)
    const name = req.body.name
    try {
      const result = db.sequelize.transaction(async (t) => {
        const user = await User.create({
          name: name,
          isDeleted: false,
        })
        const userAuth = await UserAuth.create({
          userId: user.id,
          email: email,
          password: password,
        })
        return res.json({
          id: user.id,
          email: userAuth.email,
          name: user.name,
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
          check('email')
            .isLength({ min: 1 }).withMessage('Email is required')
            .trim()
            //.normalizeEmail()
            .isEmail().withMessage('Email is not valid')
            .custom((value) => {
              return UserAuth.findByEmail(value)
                .then(userAuth => {
                  if (userAuth) {
                    return Promise.reject('This email is already in use');
                  }
                  return Promise.resolve(value);
                })
            }),
          check('password', 'Password is not valid')
            .trim()
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
          check('name', 'Your name is required')
            .trim()
            .isLength({ min: 1 }).withMessage('Name is required'),
        ]

      case 'signin':
        return [
          check('email')
            .isLength({ min: 1 }).withMessage('Email is required')
            .trim()
            //.normalizeEmail()
            .isEmail().withMessage('Email is not valid'),
          check('password', 'Password is not valid')
            .trim()
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        ]
    }
  },
}


import passport from 'passport'
import LocalStrategy from 'passport-local'
import authConfig from './auth.json'
import boom from '@hapi/boom'
import { UserAuth } from '@/models'

class Authenticator {
  static initialize(app) {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.serializeUser((userInfo, done) => {
      return done(null, userInfo);
    });

    passport.deserializeUser((userInfo, done) => {
      done(null, userInfo)
    })
  }

  static setStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: authConfig.usernameField,
          passwordField: authConfig.passwordField,
          session: true,
          passReqToCallback: true
        },
        (req, userId, password, done) => {
          UserAuth.authorize(userId, password)
            .then(userInfo => {
              if (userInfo) {
                return done(null, userInfo);
              } else {
                req.flash('authenticate_error', 'Password is not correct');
                return done(null, false);
              }
            })
            .catch(err => {
              req.flash('authenticate_error', err);
              return done(null, false);
            });
        }
      )
    )
  }

  static authenticate(req, res, next) {
    passport.authenticate(authConfig.strategyName, (err, user) => {
      if (err) { return next(err) }
      if (!user) {
        return next(boom.unauthorized('Email or password is not correct'))
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(boom.unauthorized('Email or password is not correct'))
        }
        return res.status(200).json(user)
      })
    })(req, res, next);
  }

  static signOut(req, res) {
    req.logout()
    return res.status(200).json({ message:'/sign out!' })
  }

  static isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      return next(boom.unauthorized('Require Sign In'))
    }
  }
}

export default Authenticator


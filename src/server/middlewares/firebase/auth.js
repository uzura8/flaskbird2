import admin from '@/middlewares/firebase/admin'
import boom from '@hapi/boom'
import { ServiceUser } from '@/models'

class Authenticator {
  static async verifyToken(idToken) {
    const decodeToken = await admin.auth().verifyIdToken(idToken)
    if (!decodeToken) {
      throw new Error('Your token is not correct')
    }
    const uid = decodeToken.uid
    const serviceUser = await ServiceUser.findByserviceUserId('firebase', uid)
    return {
      id: serviceUser.userId,
      name: decodeToken.name,
      email: decodeToken.email,
      type: serviceUser.User.type,
      uid: uid,
      serviceCode: 'firebase',
    }
  }

  static async isAuthenticated(req, res, next) {
    const idToken = req.headers.authorization
    try {
      const user = await this.verifyToken(idToken)
      if (user == null) {
        return next(boom.unauthorized('You are not registered'))
      }
      req.user = user
      return next()
    } catch (err) {
      return next(boom.unauthorized('You are not authorized'))
    }
  }

  static async setUser(req, res, next) {
    let user = null
    const idToken = req.headers.authorization
    if (idToken != null) {
      try {
        user = await this.verifyToken(idToken)
      } catch (err) {
        user = null
      }
    }
    req.user = user
    return next()
  }
}

export default Authenticator

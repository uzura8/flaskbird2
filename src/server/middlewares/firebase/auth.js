import admin from '@/middlewares/firebase/admin'
import boom from '@hapi/boom'
import { ServiceUser } from '@/models'

export default {
  verifyToken: async (req, res, next) => {
    const idToken = req.headers.authorization
    try {
      const decodeToken = await admin.auth().verifyIdToken(idToken)
      if (!decodeToken) {
        return next(boom.unauthorized('Your token is not correct'))
      }
      const uid = decodeToken.uid
      const serviceUser = await ServiceUser.findByserviceUserId('firebase', uid)
      req.user = {
        id: serviceUser.userId,
        email: decodeToken.email,
        name: decodeToken.name,
      }
      return next()
    } catch (err) {
      return next(boom.unauthorized('Your are not authorized'))
    }
  }
}


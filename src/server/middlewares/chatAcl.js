import config from '@/config/config'
import boom from '@hapi/boom'
import { db, Chat } from '@/models'

export default {
  checkReadable: async (req, res, next) => {
    const user = req.user
    const isAdmin = user != null && user.type == 'admin'

    let chat = await Chat.findById(req.params.id)
      .catch(err => {
        return next(boom.badImplementation(err))
      })
    if (!chat) {
      return next(boom.notFound('Requested id is invalid'))
    }
    if (isAdmin) {
      req.chat = chat
      return next()
    }
    if (chat.type == 'public') {
      req.chat = chat
      return next()
    }
    if (user != null && chat.userId == user.id) {
      req.chat = chat
      return next()
    }
    return next(boom.forbidden('You have no permission'))
  },

  checkEditable: async (req, res, next) => {
    const user = req.user
    const isAdmin = user != null && user.type == 'admin'

    let chat = await Chat.findById(req.params.id)
      .catch(err => {
        return next(boom.badImplementation(err))
      })
    if (!chat) {
      return next(boom.notFound('Requested id is invalid'))
    }
    if (isAdmin) {
      req.chat = chat
      return next()
    }
    if (user != null && chat.userId == user.id) {
      req.chat = chat
      return next()
    }
    return next(boom.forbidden('You have no permission'))
  },

  checkCommentable: async (req, res, next) => {
    const user = req.user
    const isAdmin = user != null && user.type == 'admin'

    let chat = await Chat.findById(req.params.id)
      .catch(err => {
        return next(boom.badImplementation(err))
      })
    if (!chat) {
      return next(boom.notFound('Requested id is invalid'))
    }
    if (isAdmin) {
      req.chat = chat
      return next()
    }
    if (chat.type == 'public') {
      req.chat = chat
      return next()
    }
    if (user != null && chat.userId == user.id) {
      req.chat = chat
      return next()
    }
    return next(boom.forbidden('You have no permission'))
  },
}

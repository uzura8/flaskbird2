import express from 'express'
import controller from './controller'

const router = express.Router()

router.get(
  '/:id/comments',
  controller.validate('getComments'),
  controller.setUser,
  controller.checkReadable,
  controller.getChatComments
)

router.post(
  '/:id/comments',
  controller.isAuthenticated,
  controller.validate('comment'),
  controller.checkCommentable,
  controller.createComment,
  controller.talkToChatBot
)

router.get(
  '/public',
  controller.getPublicChat
)

router.post(
  '/users/:userId/support',
  controller.isAuthenticated,
  controller.isSelf,
  controller.validate('userId'),
  controller.assignSupportChat
)

router.get(
  '/users/:userId/:type?',
  controller.isAuthenticated,
  controller.isSelf,
  controller.validate('getChatByUserId'),
  controller.getChatByUserId
)

router.get(
  '/:id',
  controller.setUser,
  controller.checkReadable,
  controller.getChat
)

router.post(
  '/:id',
  controller.isAuthenticated,
  controller.validate('editChat'),
  controller.checkEditable,
  controller.edit
)

router.get(
  '/',
  controller.setUser,
  controller.getChats
)

router.post(
  '/',
  controller.isAuthenticated,
  controller.validate('createChat'),
  controller.create
)

export default router


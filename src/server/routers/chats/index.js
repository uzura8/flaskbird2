import express from 'express'
import controller from './controller'

const router = express.Router()

router.get(
  '/:id/comments',
  controller.validate('getComments'),
  controller.getChatComments
)

router.post(
  '/:id/comments',
  controller.isAuthenticated,
  controller.validate('comment'),
  controller.createComment,
  controller.talkToChatBot
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
  controller.getChat
)

router.post(
  '/:id',
  controller.isAuthenticated,
  controller.isAuther,
  controller.validate('editChat'),
  controller.edit
)

router.get(
  '/',
  controller.getChats
)

router.post(
  '/',
  controller.isAuthenticated,
  controller.validate('createChat'),
  controller.create
)

export default router


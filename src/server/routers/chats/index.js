import express from 'express'
import controller from './controller'

const router = express.Router()

router.get(
  '/',
  controller.getChats
)

router.post(
  '/',
  controller.isAuthenticated,
  controller.validate('chat'),
  controller.create
)

router.get(
  '/:id/comments',
  controller.getChatComments
)

router.post(
  '/:id/comments',
  controller.isAuthenticated,
  controller.validate('comment'),
  controller.createComment
)

router.get(
  '/:id',
  controller.getChat
)

router.post(
  '/:id',
  controller.isAuthenticated,
  controller.isAuther,
  controller.validate('chat'),
  controller.edit
)

export default router


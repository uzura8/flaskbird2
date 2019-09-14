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
  controller.validate('create'),
  controller.create
)

router.get(
  '/:id',
  controller.getChat
)

router.post(
  '/:id',
  controller.isAuthenticated,
  controller.isAuther,
  controller.validate('create'),
  controller.edit
)

export default router


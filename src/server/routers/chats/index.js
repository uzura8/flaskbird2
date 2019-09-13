import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ page:'chats' })
})

router.post(
  '/',
  controller.isAuthenticated,
  controller.validate('create'),
  controller.create
)

router.get(
  '/:chatId',
  (req, res) => {
    res.json({ params:req.params })
  }
)

export default router


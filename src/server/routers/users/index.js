import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ page:'users' })
})

router.get(
  '/:userId',
  controller.isAuthenticated,
  (req, res) => {
    res.json({ params:req.params })
  }
)

router.post(
  '/',
  controller.validate('create'),
  controller.create
)

router.post(
  '/signin',
  controller.validate('signin'),
  controller.authenticate
)

export default router


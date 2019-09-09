import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ page:'users' })
})

router.get(
  '/check',
  controller.isAuthenticated,
  (req, res) => {
    res.json(req.user)
  }
)

router.post(
  '/signin',
  controller.validate('signin'),
  controller.authenticate
)

router.get(
  '/signout',
  (req, res) => {
    req.logout()
    res.json({ message:'/sign out!' })
  }
)

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

export default router


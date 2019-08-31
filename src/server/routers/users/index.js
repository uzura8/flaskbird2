import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ page:'users' })
})

router.post('/', controller.create)

export default router


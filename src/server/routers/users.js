import express from 'express'
import { User, UserAuth } from '../models'
import string from '../util/string'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ page:'users' })
})

router.post('/', function(req, res) {
  const email = req.body.email
  const password = string.hashing(req.body.password)
  const name = req.body.name
  User.create({
    name: name,
    isDeleted: false,
  }).then((user)=>{
    UserAuth.create({
      userId: user.id,
      email: email,
      password: password,
    }).then((UserAuth) => {
      res.json({ userId: UserAuth.userId })
    })
  })
})

export default router


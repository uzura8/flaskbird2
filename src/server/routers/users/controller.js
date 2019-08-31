import { User, UserAuth } from '@/models'
import str from '@/util/str'

export default {
  create: (req, res) => {
    const email = req.body.email
    const password = str.hashing(req.body.password)
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
  },
}


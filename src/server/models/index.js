import User from './user'
import UserAuth from './userAuth'

// relations setting
User.sync().then(() => {
  UserAuth.belongsTo(User, { foreignKey: 'userId' });
  UserAuth.sync()
  //UserTmp.sync()
})

export {
  User,
  UserAuth,
}


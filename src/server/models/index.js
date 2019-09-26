import db from './db'
import User from './user'
import UserAuth from './userAuth'
import ServiceUser from './serviceUser'
import Chat from './chat'
import ChatComment from './chatComment'

// relations setting
User.sync().then(() => {
  UserAuth.belongsTo(User, { foreignKey: 'userId' });
  UserAuth.sync()
  ServiceUser.belongsTo(User, { foreignKey: 'userId' });
  ServiceUser.sync()
  Chat.belongsTo(User, { foreignKey: 'userId' });
  Chat.sync()
  ChatComment.belongsTo(User, { as:'user', foreignKey: 'userId' });
  ChatComment.sync()
})
Chat.sync().then(() => {
  ChatComment.belongsTo(Chat, { foreignKey: 'chatId' });
  ChatComment.sync()
})

export {
  db,
  User,
  UserAuth,
  ServiceUser,
  Chat,
  ChatComment,
}


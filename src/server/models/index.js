import db from './db'
import User from './user'
import UserAuth from './userAuth'
import Chat from './chat'
import ChatComment from './chatComment'

// relations setting
User.sync().then(() => {
  UserAuth.belongsTo(User, { foreignKey: 'userId' });
  UserAuth.sync()
  Chat.belongsTo(User, { foreignKey: 'userId' });
  Chat.sync()
  ChatComment.belongsTo(User, { foreignKey: 'userId' });
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
  Chat,
  ChatComment,
}


import db from './db'

class ChatComment extends db.Sequelize.Model {
  static findAllByChatId(chatId) {
    return this.findAll({ where: { chatId: chatId }})
  }
}

ChatComment.init(
  {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    chatId: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    body: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
  }, {
    sequelize: db.sequelize,
    modelName: 'ChatComment',
    tableName: 'chat_comment',
    freezeTableName: true, // not changed table name
    underscored: true,
    timestamps: true, // Add updatedAt, createdAt
  }
)

export default ChatComment


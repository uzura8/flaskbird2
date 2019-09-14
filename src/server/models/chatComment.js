import db from './db'
import User from './user'

class ChatComment extends db.Sequelize.Model {
  static findAllByChatId(chatId, count=10, maxId=null, sinceId=null) {
    let conds = { chatId: chatId }
    if (maxId || sinceId) {
      const Op = db.Sequelize.Op
      let condsId = {}
      if (maxId !== null) {
        condsId = Object.assign(condsId, { [Op.lt]: maxId })
      }
      if (sinceId !== null) {
        condsId = Object.assign(condsId, { [Op.gt]: sinceId })
      }
      conds.id = condsId
    }
    return this.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['name'],
      }],
      where: conds,
      order: [['id', 'desc']],
      limit: count,
    })
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


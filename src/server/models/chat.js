import db from './db'

class Chat extends db.Sequelize.Model {
  static findById(id) {
    const params = { where: { id: id }}
    return this.findOne(params)
  }
}

Chat.init(
  {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: db.Sequelize.ENUM,
      values: ['private', 'public'],
      allowNull: false,
      defaultValue: 'private',
    },
    userId: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
  }, {
    sequelize: db.sequelize,
    modelName: 'Chat',
    tableName: 'chat',
    freezeTableName: true, // not changed table name
    underscored: true,
    timestamps: true, // Add updatedAt, createdAt
  }
)

export default Chat


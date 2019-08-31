import db from './db'

class User extends db.Sequelize.Model {
  static findById(id) {
    return this.findOne({ where: { id: id }})
  }
}

User.init(
  {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    isDeleted: {
      type: db.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize: db.sequelize,
    modelName: 'User',
    tableName: 'user',
    freezeTableName: true, // not changed table name
    underscored: true,
    timestamps: true, // Add updatedAt, createdAt
  }
)

export default User


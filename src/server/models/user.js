import db from './db'
import UserAuth from './userAuth'

class User extends db.Sequelize.Model {
  static findById(id, withAuth=false) {
    const params = { where: { id: id }}
    if (withAuth) {
      params.include = [{
        model: UserAuth,
        required: true
      }]
    }
    return this.findOne(params)
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
    type: {
      type: db.Sequelize.ENUM,
      values: ['normal', 'anonymous', 'admin'],
      allowNull: false,
      defaultValue: 'normal',
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


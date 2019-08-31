import db from './db'

class UserAuth extends db.Sequelize.Model {
  static findByEmail(email) {
    return this.findOne({ where: { email: email }})
  }

  //verifyPassword(password) {
  //  return bcrypt.compare(password, this.password)
  //}
}

UserAuth.init(
  {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: db.Sequelize.INTEGER,
      allowNull: false
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
  }, {
    sequelize: db.sequelize,
    modelName: 'UserAuth',
    tableName: 'user_auth',
    freezeTableName: true, // not changed table name
    underscored: true,
    timestamps: true, // Add updatedAt, createdAt
  }
)

export default UserAuth


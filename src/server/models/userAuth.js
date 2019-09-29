//import bcrypt from 'bcryptjs'
import db from './db'
import User from './user'
import str from '@/util/str'

class UserAuth extends db.Sequelize.Model {
  static findByEmail(email) {
    return this.findOne({
      include: [{
        model: User,
      }],
      where: { email: email },
    })
  }

  //verifyPassword(password) {
  //  return bcrypt.compare(password, this.password)
  //}

  static authorize(email, password) {
    return this.findOne({
      include: [{
        model: User,
      }],
      where: { email: email }
    })
      .then(userAuth => {
        if (!userAuth) {
          throw new Error('Email is not correct')
        }
        if (userAuth.password != str.hashing(password)) {
          throw new Error('Password is not correct')
        }
        return {
          id: userAuth.userId,
          name: userAuth.User.name,
          email: userAuth.email
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
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


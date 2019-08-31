import Sequelize from 'sequelize'
import config from '@/config/config.json'

const sequelize = new Sequelize(
  config.dbs.mysql.database,
  config.dbs.mysql.username,
  config.dbs.mysql.password,
  {
    host: config.dbs.mysql.host,
    dialect: 'mysql'
  }
)

export default { sequelize, Sequelize }


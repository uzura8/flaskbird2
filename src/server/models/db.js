import Sequelize from 'sequelize'
import config from '@/config/config.json'

const sequelize = new Sequelize(
  config.dbs.mysql.database,
  config.dbs.mysql.user,
  config.dbs.mysql.password,
  {
    user: config.dbs.mysql.user,
    host: config.dbs.mysql.host,
    port: config.dbs.mysql.port,
    logging: config.dbs.mysql.logging,
    dialect: 'mysql',
  }
)

export default { sequelize, Sequelize }


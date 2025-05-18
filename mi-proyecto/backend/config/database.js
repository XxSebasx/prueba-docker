const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'mydb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'example',
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
// import models
const usersSchema = require('./users');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : 'sqlite:memory';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {users: usersSchema(sequelize, DataTypes)};

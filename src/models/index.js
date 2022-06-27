'use strict';

const { Sequelize, DataTypes } = require('sequelize');
// import models
const flavorSchema = require('./flavors');
const toppingsSchema = require('./toppings');
const usersSchema = require('./users');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL || 'postgres://localhost:5432/auth-project-d47';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  sequelize,
  users: usersSchema(sequelize, DataTypes),
  flavors: flavorSchema(sequelize, DataTypes),
  toppings: toppingsSchema(sequelize, DataTypes),
};

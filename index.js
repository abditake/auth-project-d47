'use strict';

const { start } = require('./src/server');
const { sequelize } = require('./src/models/index');

const port = process.env.PORT || 3002;

sequelize.sync()
  .then(() => console.log('server up'))
  .catch(e => console.error('Could not start server', e.message));

start(port);

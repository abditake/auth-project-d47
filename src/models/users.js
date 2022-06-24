'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//SECRET
const SECRET = process.env.SECRET || 'secretstring';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'writer', 'editor', 'admin'],
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get(){ // a method that gets called on read
        return jwt.sign({username: this.username}, SECRET);
      },
      set(payload){  // a method that runs when set with "="
        return jwt.sign(payload, SECRET);
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  users.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  users.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne( { where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };
  console.log('USERS:', users);
  return users;
};

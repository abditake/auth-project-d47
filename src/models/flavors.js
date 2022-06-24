'use strict';

module.exports = (sequelize, DataTypes) => {
  const flavors = sequelize.define('Flavors', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dairy: {
      type: DataTypes.ENUM,
      values: ['dairy', 'non-dairy'],
      allowNull: false,
    },
  });
  return flavors;
};

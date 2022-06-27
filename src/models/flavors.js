'use strict';

module.exports = (sequelize, DataTypes) => {
  const flavors = sequelize.define('Flavors', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    allergens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return flavors;
};

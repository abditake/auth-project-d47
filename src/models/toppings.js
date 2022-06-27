'use strict';

module.exports = (sequelize, DataTypes) => {
  const toppings = sequelize.define('Toppings', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    allergens: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    syrupFlavor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return toppings;
};

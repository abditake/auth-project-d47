'use strict';

module.exports = (sequelize, DataTypes) => {
  const toppings = sequelize.define('Flavors', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    allergens: {
      type: DataTypes.ENUM,
      values: ['dairy', 'non-dairy', 'tree nuts', 'vegan'],
      allowNull: false,
    },
    syrupFlavor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return toppings;
};

const Sequelize = require("sequelize");
const db = require("../db");

const CartLine = db.define("cartline", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
});

module.exports = CartLine;

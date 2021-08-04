const Sequelize = require("sequelize");
const db = require("../db");

const OrderLine = db.define("orderLine", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  }
});

module.exports = OrderLine;

const Sequelize = require("sequelize");
const db = require("../db");

const Invoice = db.define("invoice", {
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  totalItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  datePurchased: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Invoice;

const Sequelize = require("sequelize");
const db = require("../db");

const InvoiceLine = db.define("invoiceline", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  }
});

module.exports = InvoiceLine;

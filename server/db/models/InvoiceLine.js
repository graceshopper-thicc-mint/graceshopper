const Sequelize = require("sequelize");
const db = require("../db");

const InvoiceLine = db.define("invoiceline", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    }, //add hook to remove if under 1    /   keeping unit price
  },
});

module.exports = InvoiceLine;

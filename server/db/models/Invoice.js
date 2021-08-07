const Sequelize = require("sequelize");
const db = require("../db");

const Invoice = db.define("invoice", {
  confirmationNumber: {
    type: Sequelize.INTEGER,
    unique: true,
    defaultValue: null
    // validate
  },
  datePurchased: {
    type: Sequelize.DATEONLY,
    defaultValue: null
  },
});

module.exports = Invoice;

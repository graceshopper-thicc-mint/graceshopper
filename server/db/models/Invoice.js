const Sequelize = require("sequelize");
const db = require("../db");

const Invoice = db.define("invoice", {
  confirmationNumber: {
    type: Sequelize.INTEGER,
    unique: true,
    // validate
  },
  datePurchased: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Invoice;

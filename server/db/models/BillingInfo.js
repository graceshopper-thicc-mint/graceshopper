const Sequelize = require("sequelize");
const db = require("../db");

const BillingInfo = db.define("billinginfo", {
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creditCardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = BillingInfo;

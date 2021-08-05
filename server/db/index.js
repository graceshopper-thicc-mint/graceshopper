//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Game = require("./models/Game");
const BillingInfo = require("./models/BillingInfo");
const Invoice = require("./models/Invoice");
const InvoiceLine = require("./models/InvoiceLine");

//associations could go here!
//manytomany for cart to game, game to cart
User.hasOne(BillingInfo);
BillingInfo.belongsTo(User);

User.hasMany(Invoice);
Invoice.belongsTo(User);

Invoice.hasMany(InvoiceLine);
InvoiceLine.belongsTo(Invoice);

Game.hasOne(InvoiceLine);
InvoiceLine.belongsTo(Game);

BillingInfo.hasOne(Invoice);
Invoice.belongsTo(BillingInfo);

module.exports = {
  db,
  models: {
    User,
    Game,
    Invoice,
    InvoiceLine,
    BillingInfo
  },
};

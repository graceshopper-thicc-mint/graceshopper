//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Game = require("./models/Game");
const Cart = require("./models/Cart");
const CartLine = require("./models/CartLine");
const BillingInfo = require("./models/BillingInfo");
const Invoice = require("./models/Invoice");
const InvoiceLine = require("./models/InvoiceLine");

//associations could go here!
//manytomany for cart to game, game to cart
Game.hasOne(CartLine);
CartLine.belongsTo(Game);

User.hasMany(CartLine);
CartLine.belongsTo(User);

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

// Game.belongsToMany(Invoice, { through: InvoiceLine});
// Invoice.belongsToMany(Game, { through: InvoiceLine});
module.exports = {
  db,
  models: {
    User,
    Game,
    Cart,
    CartLine,
    Invoice,
    InvoiceLine,
    BillingInfo
  },
};

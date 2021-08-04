//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Game = require("./models/Game");
const CartLine = require("./models/CartLine");
const Cart = require("./models/Cart");
const BillingInfo = require("./models/BillingInfo");
const Invoice = require("./models/Invoice");
const InvoiceLine = require("./models/InvoiceLine");

//associations could go here!
//manytomany for cart to game, game to cart
Game.belongsToMany(Cart, { through: CartLine});
Cart.belongsToMany(Game, { through: CartLine});

Invoice.hasOne(BillingInfo);
BillingInfo.belongsTo(Invoice);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasOne(BillingInfo);
BillingInfo.belongsTo(User);

User.hasMany(Invoice);
Invoice.belongsToMany(User, { through: "UserInvoice"});

Game.belongsToMany(Invoice, { through: InvoiceLine});
Invoice.belongsToMany(Game, { through: InvoiceLine});

module.exports = {
  db,
  models: {
    User,
    Game,
    Cart,
    BillingInfo
  },
};

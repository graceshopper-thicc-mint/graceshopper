//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Game = require("./models/Game");
const OrderLine = require("./models/OrderLine");
const Cart = require("./models/Cart");

//associations could go here!
// OrderLine.hasOne(Game);
// Game.belongsToMany(OrderLine, { through: "OrderLineGame" });
//manytomany for cart to game, game to cart
Game.belongsToMany(Cart, { through: "OrderLine" });
Cart.belongsToMany(Game, { through: "OrderLine" });
module.exports = {
  db,
  models: {
    User,
    Game,
  },
};

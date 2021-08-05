const Sequelize = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  maturityRating: {
    type: Sequelize.STRING,
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://bit.ly/2VqAWZp",
  },
  platform: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
    validate: {
      isDate: true,
    },
  },
});

module.exports = Game;

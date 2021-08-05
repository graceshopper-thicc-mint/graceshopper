const Sequelize = require("sequelize");
const db = require("../db");

const Game = db.define("game", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "TBA",
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "PC",
  },
  maturityRating: {
    type: Sequelize.STRING,
    defaultValue: "E",
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "TBA",
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://bit.ly/2VqAWZp",
  },
  platform: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "TBA",
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "TBA",
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
    validate: {
      isDate: true,
    },
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Game;

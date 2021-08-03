const Sequelize = require("sequelize");
const db = require("./database");

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
    defaultValue: null,
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
    type: Sequelize.STRING,
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

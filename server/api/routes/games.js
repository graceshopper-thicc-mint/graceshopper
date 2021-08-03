const express = require('express');
const router = express.Router();
const { Game } = require('../../db');

// GET /api/games
router.get('/games', async (req, res, next) => {
  try {
    const allGames = Game.findAll();
    res.send(allGames);
  } catch (error) {
    next(error);
  }
})

router.get('/api/games/:gameId', async (req, res, next) => {
  try {
    const game = Game.findByPk(req.params.gameId);
    res.send(game);
  } catch (error) {
    next(error);
  }
})

router.post('/api/games/create', async (req, res, next) => {
  try{
    const newGame = Game.create(req.body);
    res.send(newGame);
  } catch (error) {
    next(error);
  }
})

module.exports = router;

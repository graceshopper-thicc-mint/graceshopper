const express = require('express');
const router = express.Router();
const { models: {Game} } = require('../../db');

// GET /api/games
router.get('/', async (req, res, next) => {
  try {
    const allGames = await Game.findAll();
    res.send(allGames);
  } catch (error) {
    next(error);
  }
})

// GET /api/games/:gameId
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.gameId);
    res.send(game);
  } catch (error) {
    next(error);
  }
})

// POST /api/games
router.post('/', async (req, res, next) => {
  try{
    const newGame = await Game.create(req.body);
    res.send(newGame);
  } catch (error) {
    next(error);
  }
})


// PUT /api/games/:gameId
router.put('/:gameId', async (req, res, next) => {
  try {
    const gameToUpdate = await Game.findByPk(req.params.gameId);
    const updateGame = await gameToUpdate.update(req.body);
    res.send(updateGame);
  } catch (error) {
    next(error);
  }
})

// DELETE /api/games/:gameId
router.delete('/:gameId', async(req, res, next) => {
  try {
    const gameToDelete = await Game.findByPk(req.params.gameId);
    await gameToDelete.destroy();
    res.send(gameToDelete);
  } catch(error) {
    next(error);
  }
})

module.exports = router;

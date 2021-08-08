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

// POST /api/games/create
router.post('/create', async (req, res, next) => {
  try{
    const newGame = await Game.create(req.body);
    res.send(newGame);
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

// PUT /api/games/:gameId/edit
router.put('/:gameId', async (req, res, next) => {
  try {
    const gameToUpdate = await Game.findByPk(req.params.gameId);
    const updateGame = await gameToUpdate.update(req.body);
    res.send(updateGame);
  } catch (error) {
    next(error);
  }
})

// DELETE /api/games/
router.delete('/:gameId', async(req, res, next) => {
  try {
    const gameToDelete = await Game.findByPk(req.params.gameId);
    await gameToDelete.destroy();
    res.status(204).send(gameToDelete);
  } catch(error) {
    next(error);
  }
})

module.exports = router;

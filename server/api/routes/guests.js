const express = require('express');
const router = express.Router();
const { models: { Invoice } } = require('../../db');

// CREATE A NEW INVOICE INSTANCE WHEN GUESTS MAKE A PURCHASE
// POST /api/guests/invoice
router.post("/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router

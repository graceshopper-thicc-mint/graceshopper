const express = require('express');
const router = express.Router();
const { models: { Invoice, InvoiceLine } } = require('../../db');

// create a new invoice instance when guests make a purchase
// POST /api/guests/invoice
router.post("/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

// create invoice lines when guests purchase
// POST /api/guests/invoicelines
router.post("invoicelines", async (req, res, next) => {
  try {
    const response = await InvoiceLine.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})
module.exports = router

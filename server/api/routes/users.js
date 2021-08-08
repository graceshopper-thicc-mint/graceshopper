const router = require('express').Router()
const { models: { User, Invoice, InvoiceLine }} = require('../../db')
const { Op } = require("sequelize")

// GET ALL USERS
// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET USER BY USER ID
// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
})

// GET ALL ITEMS IN A USER'S CART (NOT PURCHASED!)
// GET /api/users/:userId/cart
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const invoice = await Invoice.findOne({
      where: {
        userId,
        datePurchased: null
      },
      include: InvoiceLine
    })
    res.send(invoice.invoicelines)
  } catch (error) {
    next(error)
  }
})

// ADD A NEW INVOICELINE INSTANCE FOR A USER WHEN "ADDED TO CART"
// POST /api/users/:userId/cart
router.post("/:userId/cart", async (req, res, next) => {
  try {
    const response = await InvoiceLine.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

// EDIT A SPECIFIC USER'S CART
// PUT /api/users/:userId/cart
router.put("/:userId/cart/:gameId", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const gameId = req.params.gameId
    const gameToUpdate = await InvoiceLine.findOne({
      where: {
        gameId
      },
      include: {
        model: Invoice,
        where : {
          userId
        }
      }
    })
    res.send(await gameToUpdate.update(req.body))
  } catch (error) {
    next(error)
  }
})

// DELETE A GAME/INVOICELINE FOR A SPECIFIC USER
// DELETE /api/users/:userId/cart/:gameId
router.delete("/:userId/cart/:gameId", async (req, res, next) => {
  try {
    const gameId = req.params.gameId
    const userId = req.params.userId

    const gameToDelete = await InvoiceLine.findOne({
      where: {
        gameId
      },
      include: {
        model: Invoice,
        where: {
          userId
        }
      }
    })
    await gameToDelete.destroy()
    res.send(gameToDelete)
  } catch (error) {
    next(error)
  }
})

// GET A USER'S INVOICE(S)
// GET /api/users/:userId/invoice
router.get("/:userId/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.findOne({
      where: {
        userId: req.params.userId,
        datePurchased: null
      }
    })
    res.send(response);
  } catch (error) {
    next(error)
  }
})

// CREATING A NEW INVOICE FOR A LOGGED IN CUSTOMER AS SOON AS THEY CHECKOUT SO THAT THEY WILL ALWAYS HAVE A CART, OR RIGHT AFTER THEY SIGN UP, WHEN GUESTS CHECK OUT.
// POST /api/users/:userId/invoice
router.post("/:userId/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

// UPDATES A USER'S ACTIVE CART WITH DATEPURCHASED AND CONFIRMATION NUMBER THEREFORE MAKING IT AN INACTIVE CART
// PUT /api/users/:userId/:invoiceId
router.put("/:userId/:invoiceId", async (req, res, next) => {
  try {
    const invoiceToUpdate = await Invoice.findOne({
      where: {
        userId: req.params.userId,
        datePurchased: null
      }
    })
    res.send(await invoiceToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
})


// GET USER'S PURCHASES IN DESCENDING ORDER
router.get("/:userId/purchases", async (req, res, next) => {
  try {
    const recentPurchase = await Invoice.findAll({
      where: {
        userId: req.params.userId,
        datePurchased: {
          [Op.not]: null
        }
      },
      order: [["datePurchased", "DESC"]]
    })
    res.send(recentPurchase)
  } catch (error) {
    next(error)
  }
})

module.exports = router

const router = require('express').Router()
const { models: { User, Invoice, InvoiceLine }} = require('../../db')
module.exports = router

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

// Get /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    console.log('inside /api/users/:userId: ', user);
    res.send(user);
  } catch (error) {
    next(error);
  }
})

// GET /api/users/:userId/cart  ==> display what's in their cart.
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

// POST /api/users/:userId/cart ==> everytime they "add to cart"
router.post("/:userId/cart", async (req, res, next) => {
  try {
      // Associate the invoice with the invoiceline
    const response = await InvoiceLine.create(req.body)
    console.log(response);
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:userId/cart ==> if they want to edit their cart
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

// DELETE /api/users/:userId/cart/:gameId ==> , or if they click remove in their cart.
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

// CREATING A NEW INVOICE FOR A LOGGED IN CUSTOMER AS SOON AS THEY CHECKOUT SO THAT THEY WILL ALWAYS HAVE A CART, OR RIGHT AFTER THEY SIGN UP, WHEN GUESTS CHECK OUT.

// GET /api/users/:userId/invoice
router.get("/:userId/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.findOne({
      where: {
        userId: req.params.userId,
      }
    })
    console.log('invoiceId: ', response)
    res.send(response);
  } catch (error) {
    next(error)
  }
})

// POST /api/users/:userId/invoice
router.post("/:userId/invoice", async (req, res, next) => {
  try {
    const response = await Invoice.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

// UPDATES INVOICE INSTANCE WITH DATEPURCHASED AND CONFIRMATIONNUMBER

//PUT /api/users/:userId/:invoiceId
router.put("/:userId/:invoiceId", async (req, res, next) => {
  try {
    const invoiceToUpdate = await Invoice.findOne({
      where: {
        userId: req.params.userId
      }
    })

    console.log('inside put invoiceId: ', invoiceToUpdate);
    console.log('req.body: ', req.body);

    res.send(await invoiceToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
})

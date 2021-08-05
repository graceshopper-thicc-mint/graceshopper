const router = require('express').Router()
const { models: { User, Cart, CartLine }} = require('../../db')
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

// GET /api/users/:userId/cart  ==> display what's in their cart.
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: {
        model: Cart,
        include: { model: CartLine }
      }
    })
    res.send(user.cart.cartlines)
  } catch (error) {
    next(error)
  }
})

// POST /api/users/:userId/cart ==> everytime they "add to cart"

// PUT /api/users/:userId/cart ==> if they want to edit their cart

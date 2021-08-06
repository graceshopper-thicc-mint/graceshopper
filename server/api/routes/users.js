const router = require('express').Router()
const { models: { User, CartLine, Game }} = require('../../db')
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
    const cartItems = await CartLine.findAll({
      where: {
        userId: userId
      },
      include: {
        model: Game
      }
    });
    res.send(cartItems);
    // const user = await User.findOne({
    //   where: {
    //     id: userId
    //   },
    //   include: {
    //     model: CartLine,
    //     include: {
    //       model: Game
    //     }
    //   }
    // })
    // res.send(user.cartlines)
  } catch (error) {
    next(error)
  }
})

// POST /api/users/:userId/cart ==> everytime they "add to cart"
router.post("/:userId/cart", async (req, res, next) => {
  try {
    /*with the userid, find their associated cart.
    then with that cart, associate it to cartlines, and then add a row with the new product*/
    const response = await CartLine.create(req.body)
    res.status(201).send(response)
  } catch (error) {
    console.log(error)
  }
})

// PUT /api/users/:userId/cart ==> if they want to edit their cart
router.put("/:userId/cart/:gameId", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const gameId = req.params.ganmeId
    const gameToUpdate = await User.findOne({
      where: {
        id: userId
      },
      include: {
        model: CartLine,
        where: {
          gameId
        }
      }
    })
    res.send(await CartLine.update(req.body))
  } catch (error) {
    next(error)
  }
})

// DELETE /api/users/:userId/cart/:gameId ==> if they change the quantity down to 0, or if they click remove in their cart.
router.delete("/:userId/cart/:gameId", async (req, res, next) => {
  try {
    const gameId = req.params.gameId
    const gameToDelete = await CartLine.findOne({
      where: {
        gameId
      }
    })
    await gameToDelete.destroy()
    res.send(gameToDelete)
  } catch (error) {
    next(error)
  }
})

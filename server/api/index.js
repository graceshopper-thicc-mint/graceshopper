const router = require('express').Router()
module.exports = router

router.use('/users', require('./routes/users'))
router.use('/games', require('./routes/games'));
router.use("/guests", require("./routes/guests"))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/wishlists', require('./wishlist'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

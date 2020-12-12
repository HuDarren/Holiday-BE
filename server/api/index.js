const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/wishlists', require('./wishlist'));

router.use('/groups', require('./group'));

router.use('/friends', require('./friends'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const router = require('express').Router();
const { WishList } = require('../db/models');

module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userWishList = await WishList.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(userWishList);
  } catch (error) {
    next(error);
  }
});

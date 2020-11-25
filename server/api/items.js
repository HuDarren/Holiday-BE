const router = require('express').Router();
const { Item } = require('../db/models');
module.exports = router;

// get all data by userId

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await Item.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(userData);
  } catch (error) {
    next(error);
  }
});


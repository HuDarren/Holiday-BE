const router = require('express').Router();
const { WishList } = require('../db/models');

module.exports = router;

// get all wishlist by userid
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

// a new wishlist

router.post('/:id', async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    let listData = { name, description, userId: req.params.id }
    if (image) listData = image;
    const List = await WishList.create(listData);
    res.json(List);
  } catch (error) {
    next(error);
  }
});

// update wishlist

router.put('/:userId/:wishId', async (req, res, next) => {
  try {
    const {name, description, image} = req.body;
    const updateFields = { name, description};
    if (image) updateFields.image = image;
    const ListInfo = await WishList.update(updateFields, {
      where: { userId: req.params.userId, id: req.params.wishId },
    });
    res.json(ListInfo);
  } catch (error) {
    next(error);
  }
});

// delete wishlist by wishlist Id

router.delete('/:id', async (req, res, next) => {
  try {
    const removeInfo = await WishList.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(removeInfo);
  } catch (error) {
    next(error);
  }
});

const router = require('express').Router();
const { Item , WishList} = require('../db/models');
// const WishList = require('../db/models/wishlist');
module.exports = router;

// get all data by wishlistId

router.get('/:id', async (req, res, next) => {
  try {
    const wishlistId = req.params.id;
    const userData = await Item.findAll({
      where: {
        wishlistId: wishlistId,
      },
      include: { model: WishList },
    });
    res.json(userData);
  } catch (error) {
    next(error);
  }
});

// remove a item

router.delete('/:id', async (req, res, next) => {
  try {
    const removeItem = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(removeItem);
  } catch (error) {
    next(error);
  }
});

// update a item

router.put('/:wishid/:itemid', async (req, res, next) => {
  try {
    const {name, description, Image} = req.body;
    const updateFields = { name, description };
    if (Image) updateFields.Image = Image
    const ListInfo = await Item.update(updateFields, {
      where: {
        id: req.params.itemid,
        wishlistId: req.params.wishid,
      },
    });
    res.json(ListInfo);
  } catch (error) {
    next(error);
  }
});

// add new item

router.post('/:id', async (req, res, next) => {
  try {
    const {name, description, Image } = req.body
    let newItemData = {name, description, wishlistId : req.params.id};
    if (Image) newItemData.Image = Image;
    const newItem = await Item.create(newItemData);
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

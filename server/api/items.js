const router = require('express').Router();
const { Item } = require('../db/models');
module.exports = router;

// get all data by wishlistId

router.get('/:id', async (req, res, next) => {
  try {
    const wishlistId = req.params.id;
    const userData = await Item.findAll({
      where: {
        wishlistId: wishlistId,
      },
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

router.put('/:id', async (req, res, next) => {
  try {
    const updateFields = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    };
    const ListInfo = await Item.update(updateFields, {
      where: {
        id: req.params.id,
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
    const newItem = await Item.create({
      name: req.body.name,
      description: req.body.description,
      Image: req.body.image,
      wishlistId: req.params.id,
    });
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

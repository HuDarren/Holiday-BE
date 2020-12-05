const router = require('express').Router();
const { Group } = require('../db/models');
module.exports = router;

// get all data by groupId

router.get('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const groupData = await Group.findAll({
      where: {
        id: groupId,
      },
    });
    res.json(groupData);
  } catch (error) {
    next(error);
  }
});

// get all groups by userId

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const groupData = await Group.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(groupData);
  } catch (error) {
    next(error);
  }
});

// create a new group

router.post('/:id', async (req, res, next) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.params.id,
    });
    res.json(group);
  } catch (error) {
    next(error);
  }
});

// update a group

// delete a group
router.delete('/:id', async (req, res, next) => {
  try {
    const removeInfo = await Group.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(removeInfo);
  } catch (error) {
    next(error);
  }
});

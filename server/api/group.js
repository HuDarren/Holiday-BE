const router = require('express').Router();
const { Group } = require('../db/models');
module.exports = router;

// get all data by groupId

router.get('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const groupData = await Group.findAll({
      where: {
        Id: groupId,
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
    const userData = await Group.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(groupData);
  } catch (error) {
    next(error);
  }
});



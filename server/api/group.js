const router = require('express').Router();
const { Group, User } = require('../db/models');
const { route } = require('./items');
module.exports = router;

// Find group & add user
router.post('/:groupId/add-user/:userId', async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findOne({ where: { id: groupId } });
    const following = await group.addGroupFollow(userId);
    res.json(following);
  } catch (error) {
    next(error);
  }
});

// Find Group and remove user
router.delete('/:groupId/add-user/:userId', async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: {
        id: req.params.groupId,
      },
    });
    const removeGroup = await group.removeGroupFollow(req.params.userId);
    res.json(removeGroup);
  } catch (error) {
    next(error);
  }
});

// Get group data by group id
router.get('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const groupData = await Group.findOne({
      where: {
        id: groupId,
      },
      include: { model: User, as: 'GroupFollow' },
    });
    res.json(groupData);
  } catch (error) {
    next(error);
  }
});

// get groups by user id

router.get('/creator/:id', async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      where: { userId: req.params.id },
    });
    res.json(groups);
  } catch (error) {
    next(error);
  }
});

// Create a new group
router.post('/:id', async (req, res, next) => {
  try {
    const { name, description, groupImg, match } = req.body;
    const newGroup = await Group.create({
      name,
      description,
      groupImg,
      match,
      budget,
      exchangeDate,
      userId: req.params.id,
    });
    res.json(newGroup);
  } catch (error) {
    next(error);
  }
});

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

router.put('/:groupId/:userId', async (req, res, next) => {
  try {
    const updateFields = {
      name: req.body.name,
      description: req.body.description,
      groupImg: req.body.groupImg,
      userId: req.params.userId,
      exchangeDate: req.body.exchangeDate,
      budget: req.body.budget,
      match: req.body.match,
    };
    const update = await Group.update(updateFields, {
      where: {
        id: req.params.groupId,
      },
    });
    res.json(update);
  } catch (error) {
    next(error);
  }
});

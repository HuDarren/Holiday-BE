const router = require('express').Router();
const { Group, User } = require('../db/models');
module.exports = router;

// Find group & add user
router.post('/:groupId/add-user/:userId', async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findOne({ where: { id: groupId } });
    const following = await group.addUser(userId);
    res.json(following);
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
      include: { model: User },
    });
    res.json(groupData);
  } catch (error) {
    next(error);
  }
});

// Create a new group
router.post('/', async (req, res, next) => {
  try {
    const { name, description, groupImg, creatorId } = req.body;
    const newGroup = await Group.create({
      name,
      description,
      groupImg,
      creatorId,
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

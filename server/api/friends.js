const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// get all following id

router.get('/follow/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, as: 'friend-following' }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// get all follower id
router.get('/follower/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, as: 'friend-follower' }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

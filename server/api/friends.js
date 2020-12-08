const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// get all follower by userid

router.get('/follower/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, as: 'following' }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// get all follow by userid
router.get('/follow/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User, as: 'follower' }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

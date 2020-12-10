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

// Find user and follow
router.post('/:followId/user/:userId', async (req, res, next) => {
  try {
    const { followId, userId } = req.params;
    const follow = await User.findOne({
      where: {
        id: followId,
      },
    });
    const following = await follow.addFollower(userId);
    res.json(following);
  } catch (error) {
    next(error);
  }
});

// Find User and unfollow

router.delete('/:followId/user/:userId', async (req, res, next) => {
  try {
    const { followId, userId } = req.params;
    const follow = await User.findOne({
      where: {
        id: followId,
      },
    });
    const following = await follow.removeFollower(userId);
    res.json(following);
  } catch (error) {
    next(error);
  }
});

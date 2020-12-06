const router = require('express').Router();
const { User, Group } = require('../db/models');
module.exports = router;

// get all user information
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'address', 'profileImage'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// find all user by id

router.get('/:id', async (req, res, next) => {
  try {
    const userId = await User.findOne({
      where: { id: req.params.id },
      include: { model: Group, attributes: []}
    });
    res.json(userId);
  } catch (err) {
    next(err);
  }
});

// update a existing user

router.put('/:id', async (req, res, next) => {
  try {
    const updatedFields = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const UserInfo = await User.update(updatedFields, {
      where: { id: req.params.id },
    });
    res.json(UserInfo);
  } catch (err) {
    next(err);
  }
});

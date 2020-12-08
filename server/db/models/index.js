const User = require('./user');
const Group = require('./group');
const Item = require('./item');
const WishList = require('./wishlist');

// -------Associations --------------

User.belongsToMany(Group, {
  through: 'group-following',
});

Group.belongsToMany(User, {
  through: 'group-following',
});

User.belongsToMany(User, {
  as: 'follower',
  through: 'friend-follow',
  foreignKey: 'userId',
});

User.belongsToMany(User, {
  as: 'following',
  through: 'friend-follow',
  foreignKey: 'followerId',
});

User.hasMany(WishList);

WishList.hasMany(Item);

//------------------------------------

module.exports = {
  User,
  Group,
  Item,
  WishList,
};

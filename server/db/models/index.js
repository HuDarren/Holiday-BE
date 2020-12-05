const User = require('./user');
const Group = require('./group');
const Item = require('./item');
const WishList = require('./wishlist');

// -------Associations --------------

Group.belongsTo(User);

User.belongsToMany(Group, {
  as: 'follower',
  through: 'group-follow',
  foreignKey: 'userId',
});

User.belongsToMany(User, {
  as: 'friend-follower',
  through: 'friend-follow',
  foreignKey: 'userId',
});

User.belongsToMany(User, {
  as: 'friend-following',
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

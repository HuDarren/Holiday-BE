const User = require('./user');
const Group = require('./group');
const Item = require('./item');
const WishList = require('./wishlist');

// -------Associations --------------

User.belongsToMany(Group, {
  through: 'groupFollowing',
});

Group.belongsToMany(User, {
  through: 'groupFollowing',
});

User.belongsToMany(User, {
  as: 'follower',
  through: 'friendFollow',
  foreignKey: 'userId',
});

User.belongsToMany(User, {
  as: 'following',
  through: 'friendFollow',
  foreignKey: 'followerId',
});

User.hasMany(Group)

User.hasMany(WishList);

WishList.hasMany(Item);

//------------------------------------

module.exports = {
  User,
  Group,
  Item,
  WishList,
};

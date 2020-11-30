const User = require('./user');
const Group = require('./group');
const Item = require('./item');
const WishList = require('./wishlist');

// -------Associations --------------

Group.belongsTo(User);

User.belongsToMany(Group, {
  as: 'follower',
  through: 'follow',
  foreignKey: 'userId',
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

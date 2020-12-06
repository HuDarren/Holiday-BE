const User = require('./user');
const Group = require('./group');
const Item = require('./item');
const WishList = require('./wishlist');

// -------Associations --------------

User.belongsToMany(Group, {
  through: 'following',
});

Group.belongsToMany(User, {
  through: 'following',
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

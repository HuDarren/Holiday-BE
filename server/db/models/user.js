const User = require("./user");
// const Group = require("./group");
// const Item = require("./item");

// -------Associations --------------

// User.hasMany(Item);

// Group.belongsTo(User);

// User.belongsToMany(Group, {
//   as: "follower",
//   through: "follow",
//   foreignKey: "userId",
// });

//------------------------------------

module.exports = {
  User,
  //   Group,
  //   Item,
};

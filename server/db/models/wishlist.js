const Sequelize = require('sequelize');
const db = require('../db');

const WishList = db.define('wishlists', {
  name: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://res.cloudinary.com/dsi0jbonx/image/upload/v1607120302/present_jy05hb.png',
  },
});

module.exports = WishList;

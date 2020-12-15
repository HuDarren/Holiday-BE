const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('items', {
  name: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  Image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://res.cloudinary.com/dsi0jbonx/image/upload/v1607142040/present_kjqse1.jpg',
  },
});

module.exports = Item;

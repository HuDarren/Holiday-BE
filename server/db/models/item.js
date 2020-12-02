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
      'https://mpng.subpng.com/20180203/poe/kisspng-gift-red-christmas-birthday-clip-art-small-present-cliparts-5a7581cde5e902.6028480315176503819417.jpg',
  },
});

module.exports = Item;

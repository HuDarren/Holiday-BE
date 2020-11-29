const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('items', {
  data: {
    type: Sequelize.JSON,
  },
});

module.exports = Item;

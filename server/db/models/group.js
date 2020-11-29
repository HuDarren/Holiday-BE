const Sequelize = require('sequelize');
const db = require('../db');

const Group = db.define('groups', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    },
  },
  groupImg: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

module.exports = Group;
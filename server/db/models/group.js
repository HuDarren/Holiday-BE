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
    defaultValue:
      'https://res.cloudinary.com/dsi0jbonx/image/upload/v1604683709/christmas_bg3_maguug.png',
  },
  creatorId: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Group;

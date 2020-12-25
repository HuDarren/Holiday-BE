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
  exchangeDate: {
    type: Sequelize.DATE,
    // get: function () {
    //   return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
    // },
    defaultValue: Sequelize.NOW,
  },
  budget: {
    type: Sequelize.INTEGER,
  },
  match: {
    type: Sequelize.JSON,
  },
});

Group.afterCreate(async (group) => {
  const{userId}= group;
  await group.addGroupFollow(userId)
});

module.exports = Group;

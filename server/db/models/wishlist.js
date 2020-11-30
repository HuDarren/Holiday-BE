const Sequelize = require("sequelize")
const db = require("../db")

const WishList = db.define("wishlists", {
    name :{
        type : Sequelize.TEXT
    },
    description :{
        type: Sequelize.TEXT
    }
})

module.exports = WishList
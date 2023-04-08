const sequelize = require("sequelize");
const conn = require("../config/sequelizeConfig");

//use the sequelize obj the define the model
const User = conn.define('user', {
    email: {
        type: sequelize.STRING,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    avatarUrl: {
        type: sequelize.STRING
    },
    avatarname: {
        type: sequelize.STRING
    }
   
});



//export the model
module.exports = User;

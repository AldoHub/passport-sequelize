const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

//database connection 
const conn = new Sequelize("posts", "root", "", {
    host: "localhost",
    dialect: "mysql",
   
});

module.exports = conn;
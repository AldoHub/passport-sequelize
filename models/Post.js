const sequelize = require("sequelize");
const conn = require("../config/sequelizeConfig");
const User = require("./User");

//use the sequelize obj the define the model
const Post = conn.define('post', {
    title: {
        type: sequelize.STRING
    },
    content: {
        type: sequelize.STRING
    },
    coverUrl: {
        type: sequelize.STRING
    },
    covername: {
        type: sequelize.STRING
    }
});

Post.belongsTo(User);
User.hasMany(Post);

//export the model
module.exports = Post;

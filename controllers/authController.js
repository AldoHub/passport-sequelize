const conn = require("../config/sequelizeConfig");
const fs = require("fs");
const bcrypt = require("bcrypt");
const usersUpload = require("../libs/users");
const saltRounds = 10;
const User = require("../models/User");
const handle = require("../libs/promiseHandler");

const authController = {
    showRegister: (req, res) => {
        res.render("register");
    },
    register: (req, res) => {
        if(conn.error){
            res.status(500);
        }else{
            usersUpload(req, res, (err) => {
                if(err){
                    res.status(500).render("./register", {err: `Error uploading image: ${err}`});
                }else{
                    if(req.body.email === "" || req.body.password === ""){
                        //at this point the image is being uploaded for some reason
                        //so we need to remove it
                        let avatarsPath = `./users/avatars/${req.file.filename}`;
                        fs.unlinkSync(avatarsPath, (err) => {
                            if(err){
                              console.log(`Error deleting ${req.file.filename}`)
                            }
                        })
                        res.status(403).render("./register", {err: "Please fill all the form elements"});
                    }else{
                       //everything went OK, continue
                       //enctrypt the password
                       let hash = bcrypt.hashSync(req.body.password, saltRounds); 
                     
                       //save the new user
                       User.create({
                        email: req.body.email,
                        password: hash,
                        avatarUrl: req.file.filename,
                        avatarname: req.file.filename 
                       }).then((post) => {
                           console.log(post);

                         

                           res.status(201).redirect("/");
                       }).catch(err => {
                           console.log(err);
                           let avatarsPath = `./users/avatars/${req.file.filename}`;
                           fs.unlinkSync(avatarsPath, (err) => {
                               if(err){
                                 console.log(`Error deleting ${req.file.filename}`)
                               }
                           })
                           res.status(500).render("./register", {
                                err: `There was an error: ${err}`
                           });
                       });
                    }
                }
               
            });
            
        }
    },
    logout: (req, res) => {
        req.logout();

        res.redirect("/auth/login");
        
    }

}

module.exports = authController;
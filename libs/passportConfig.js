
let passport= require("passport");
let LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//-------- use the LocalStrategy
passport.use(new LocalStrategy (
    //username and password are the name
    //of the fields in the login form
    function(username, password, done){
        //check if data is being passed
        console.log(`
        ----------USERNAME: ${username},
        ----------PASSWORD: ${password}
        `);

        User.findOne({where: {email: username}}).then(user => {
           console.log(user)
            if(user !== null){
                return done(null,{user_id: "userid" });
            }else{
                done(null, false);
            }
           
        }).catch(err =>{
            console.log(err)
            done(null, false);
        });
       
    }
    
));

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  
});
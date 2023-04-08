const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

//register
router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login",(req, res)=>{
    res.render("./login");
});

//auth the user using the local strategy
router.post("/login", passport.authenticate(
    "local", {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }

));
//logout
router.get("/logout", authController.logout);

module.exports = router;
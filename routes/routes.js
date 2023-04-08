const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/passportAuth");

router.get("/", authMiddleware(), postController.getAllPosts);


module.exports = router;
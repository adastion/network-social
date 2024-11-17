const express = require('express');
const router = express.Router();
const multer = require("multer");
const { UserController, PostController, CommentsController } = require('../controllers');
const authenticateToken = require("../middelware/auth")

const uploadDestination = "uploads"

const storage = multer.diskStorage({
  destinationn: uploadDestination,
  fileName: (res, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploads = multer({ storage: storage })

// home page
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, UserController.updateUser);

//posts page
router.post("/posts", authenticateToken, PostController.createPost)
router.get("/posts", authenticateToken, PostController.getAllPosts)
router.get("/posts/:id", authenticateToken, PostController.getPostById)
router.delete("/posts/:id", authenticateToken, PostController.deletePost)

//comments page
router.post("/comments", authenticateToken, CommentsController.createComments)
router.delete("/comments/:id", authenticateToken, CommentsController.deleteComments)

module.exports = router;

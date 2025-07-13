const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public Routes
router.get("/", getAllPosts);            // GET all posts
router.get("/:id", getPostById);         // GET single post

// Protected Routes (need token)
router.post("/", verifyToken, upload.single("image"), createPost); // POST with image
router.put("/:id", verifyToken, updatePost);  // UPDATE post
router.delete("/:id", verifyToken, deletePost); // DELETE post

module.exports = router;
const express = require("express");
const {
  addComment,
  getCommentsForPost,
} = require("../controllers/commentController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const router = express.Router();

// @route   POST /api/comments
router.post("/", verifyToken, addComment);

// @route   GET /api/comments/:postId
router.get("/:postId", getCommentsForPost);

module.exports = router;
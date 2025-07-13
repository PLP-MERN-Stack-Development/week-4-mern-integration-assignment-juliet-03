const Comment = require("../models/Comment");
 const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const newComment = new Comment({
      postId,
      text,
      userId: req.user.id,
      username: req.user.username, // from auth middleware
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

 const getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to load comments" });
  }
};

module.exports = {
  addComment,
  getCommentsForPost,
};
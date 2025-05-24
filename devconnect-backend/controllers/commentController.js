const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { postId, text } = req.body;
  try {
    const comment = new Comment({ post: postId, user: req.user.id, text });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.user.id)) {
      comment.likes.push(req.user.id);
      await comment.save();
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

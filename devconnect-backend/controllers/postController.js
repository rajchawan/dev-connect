const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = new Post({ user: req.user.id, content });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
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
  const { q, page = 1, limit = 10 } = req.query;

  const query = q ? { content: new RegExp(q, 'i') } : {};

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(posts);
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
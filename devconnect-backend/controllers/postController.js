const { Post, User, Comment } = require('../models');
const { Op } = require('sequelize');

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const image = req.file?.filename;

  try {
    const post = await Post.create({
      content,
      image,
      userId: req.user.id
    });

    const fullPost = await Post.findByPk(post.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'avatar'] },
        { model: User, as: 'Likes', attributes: ['id'] },
        { model: Comment, as: 'Comments', attributes: ['id'] } // FIXED
      ]
    });

    res.json({
      id: fullPost.id,
      content: fullPost.content,
      image: fullPost.image,
      createdAt: fullPost.createdAt,
      user: fullPost.User,
      likesCount: fullPost.Likes.length,
      commentsCount: fullPost.Comments.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPosts = async (req, res) => {
  const { q, page = 1, limit = 100 } = req.query;

  const whereClause = q
    ? { content: { [Op.iLike]: `%${q}%` } }
    : {};

  try {
    const posts = await Post.findAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: User,
          as: 'Likes',
          attributes: ['id']
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['id']
        }
      ]
    });

    const formatted = posts.map(post => ({
      id: post.id,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      user: post.User,
      likesCount: post.Likes.length,
      commentsCount: post.Comments.length
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const alreadyLiked = await post.hasLike(req.user.id);

    if (!alreadyLiked) {
      await post.addLike(req.user.id);
    }

    const updatedPost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'Likes',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('likes', 'name avatar');
    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
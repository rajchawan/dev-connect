const { User } = require('../models');
const { Op } = require('sequelize');

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update current user's profile
exports.updateProfile = async (req, res) => {
  const { name, skills } = req.body;
  try {
    const [_, [updatedUser]] = await User.update(
      { name, skills },
      {
        where: { id: req.user.id },
        returning: true
      }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const targetUser = await User.findByPk(targetUserId);
    const currentUser = await User.findByPk(currentUserId);

    if (!targetUser) return res.status(404).json({ msg: 'Target user not found' });

    const alreadyFollowing = await targetUser.hasFollower(currentUser);
    if (!alreadyFollowing) {
      await targetUser.addFollower(currentUser);
      await currentUser.addFollowing(targetUser);
    }

    res.json({ msg: 'User followed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  const { q } = req.query;

  try {
    const users = await User.findAll({
      where: q
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${q}%` } },
              { email: { [Op.iLike]: `%${q}%` } }
            ]
          }
        : {},
      attributes: { exclude: ['password'] }
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

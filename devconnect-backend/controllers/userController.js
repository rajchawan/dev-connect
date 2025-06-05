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
  console.log('Received file:', req.file); // <-- log this
  console.log('Received body:', req.body); // <-- and this

  const { name, skills } = req.body;
  const avatar = req.file ? req.file.filename : undefined;

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (skills) {
      updateData.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(s => s.trim());
    }

    if (avatar) updateData.avatar = avatar;

    const [_, [updatedUser]] = await User.update(updateData, {
      where: { id: req.user.id },
      returning: true
    });

    res.json(updatedUser);
  } catch (err) {
    console.error('Profile update failed:', err); // <- log error clearly
    res.status(500).json({ msg: 'Server error', error: err.message });
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

exports.getConnections = async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.user.id);
    if (!currentUser) {
      console.error('User not found with ID:', req.user.id);
      return res.status(404).json({ msg: 'User not found' });
    }

    const following = await currentUser.getFollowing({
      attributes: ['id', 'name', 'avatar']
    });

    const followers = await currentUser.getFollowers({
      attributes: ['id', 'name', 'avatar']
    });

    const followingIds = following.map(user => user.id);

    const usersToFollow = await User.findAll({
      where: {
        id: {
          [Op.notIn]: [...followingIds, req.user.id]
        }
      },
      attributes: ['id', 'name', 'avatar']
    });

    res.json({ following, followers, usersToFollow });
  } catch (err) {
    console.error('Failed to fetch connections:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.searchUsers = async (req, res) => {
  const { q } = req.query;

  try {
    const whereCondition = q
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } },
            { email: { [Op.iLike]: `%${q}%` } }
          ]
        }
      : {};

    const users = await User.findAll({
      where: whereCondition,
      attributes: ['id', 'name', 'avatar', 'skills'] // ✅ Include 'skills' here
    });

    res.json(users);
  } catch (err) {
    console.error('User search failed:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
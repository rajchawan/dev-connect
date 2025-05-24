const User = require('../models/User');

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { name, skills } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { name, skills }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!targetUser.followers.includes(req.user.id)) {
      targetUser.followers.push(req.user.id);
      currentUser.following.push(targetUser._id);
      await targetUser.save();
      await currentUser.save();
    }

    res.json({ msg: 'User followed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Search users by name
exports.searchUsers = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({ name: new RegExp(query, 'i') }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

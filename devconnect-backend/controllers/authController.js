const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// await sendEmail(user.email, 'Welcome!', 'Thanks for registering!');

const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  const { name, email, password, skills } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, skills });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Send welcome email after saving the user
    await sendEmail(user.email, 'Welcome!', 'Thanks for registering!');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set JWT as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only secure in prod
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({ msg: 'Login successful' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logged out successfully' });
};

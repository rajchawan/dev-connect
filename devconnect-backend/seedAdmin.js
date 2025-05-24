// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await User.findOne({ email: 'admin@example.com' });
  if (existingAdmin) {
    console.log('Admin user already exists');
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = new User({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    isAdmin: true,
    skills: ['Admin', 'Moderation']
  });

  await admin.save();
  console.log('Admin user created');
  process.exit(0);
};

seedAdmin();

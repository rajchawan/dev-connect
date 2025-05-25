const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User'); // Adjust path as needed
const bcrypt = require('bcryptjs');

// Connect to your DB
mongoose.connect('mongodb://localhost:27017/devconnect')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const createFakeUsers = async (count = 10) => {
  for (let i = 0; i < count; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      skills: [faker.hacker.verb(), faker.hacker.noun()],
      isAdmin: false,
    });

    await user.save();
    console.log(`Created: ${user.email}`);
  }

  mongoose.disconnect();
};

const createAdmin = async (count = 1) => {
  for (let i = 0; i < count; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      skills: [faker.hacker.verb(), faker.hacker.noun()],
      isAdmin: false,
    });

    await user.save();
    console.log(`Created: ${user.email}`);
  }

  mongoose.disconnect();
};

createFakeUsers(10);

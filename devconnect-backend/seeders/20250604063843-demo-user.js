'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    // Generate 20 random users
    for (let i = 0; i < 20; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
        avatar: faker.image.avatar(),
        skills: faker.random.arrayElements(
          ['JavaScript', 'Node.js', 'React', 'Python', 'Ruby', 'Java', 'SQL', 'C++', 'HTML', 'CSS'],
          faker.datatype.number({ min: 1, max: 5 })
        ),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Add 1 admin user
    const adminPassword = await bcrypt.hash('password123', 10);
    users.push({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      avatar: faker.image.avatar(),
      skills: ['JavaScript', 'Node.js', 'Admin'],
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

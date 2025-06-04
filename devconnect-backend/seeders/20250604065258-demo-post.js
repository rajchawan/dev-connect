'use strict';

const faker = require('faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    // First get all users from the database
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    // The result of raw query is an array: [results, metadata]
    const userRows = users[0];

    const posts = [];

    const POSTS_MIN = 1; // Minimum posts per user
    const POSTS_MAX = 5; // Maximum posts per user

    for (const user of userRows) {
      // Random number of posts per user
      const postCount = faker.datatype.number({ min: POSTS_MIN, max: POSTS_MAX });

      for (let i = 0; i < postCount; i++) {
        posts.push({
          userId: user.id,
          content: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Posts', posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};

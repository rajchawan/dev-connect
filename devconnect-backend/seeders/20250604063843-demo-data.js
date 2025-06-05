'use strict';

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create Users (1 admin + 20 normal)
    const passwordHash = await bcrypt.hash('password123', 10);
    const users = [];

    // Admin user
    users.push({
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      isAdmin: true,
      avatar: null,
      skills: ['Leadership', 'Management'],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    for (let i = 1; i <= 20; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: passwordHash,
        isAdmin: false,
        avatar: null,
        skills: faker.helpers.uniqueArray(faker.word.words, 3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, { returning: true });
    const userRows = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 2. Create Posts
    const posts = [];
    for (const user of userRows) {
      const postCount = faker.number.int({ min: 3, max: 4 });
      for (let i = 0; i < postCount; i++) {
        posts.push({
          content: faker.lorem.paragraph({ min: 1, max: 3 }),
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Posts', posts, { returning: true });
    const postRows = await queryInterface.sequelize.query(
      `SELECT id, "userId" FROM "Posts";`,  // <-- fixed
      { type: Sequelize.QueryTypes.SELECT }
    )

    // 3. Create Comments (3–5 per post)
    const comments = [];
    for (const post of postRows) {
      const commentCount = faker.number.int({ min: 3, max: 5 });
      for (let i = 0; i < commentCount; i++) {
        const randomUser = faker.helpers.arrayElement(userRows);
        comments.push({
          text: faker.lorem.sentence(),
          postId: post.id,
          userId: randomUser.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Comments', comments, { returning: true });
    const commentRows = await queryInterface.sequelize.query(
      `SELECT id FROM "Comments";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 4. PostLikes (2–5 likes per post)
    const postLikes = [];
    for (const post of postRows) {
      const likeCount = faker.number.int({ min: 2, max: 5 });
      const shuffledUsers = faker.helpers.shuffle(userRows);
      for (let i = 0; i < likeCount; i++) {
        postLikes.push({
          postId: post.id,
          userId: shuffledUsers[i].id
        });
      }
    }
    await queryInterface.bulkInsert('PostLikes', postLikes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PostLikes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
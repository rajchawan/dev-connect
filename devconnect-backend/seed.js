// const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');
// const { Sequelize, sequelize, User, Post, Comment, Notification } = require('./models'); // Adjust import as needed

// const USERS_COUNT = 25; // More than 20 users
// const POSTS_MIN = 2;
// const POSTS_MAX = 4;
// const COMMENTS_MIN = 2;
// const COMMENTS_MAX = 4;

// const seedData = async () => {
//   try {
//     await sequelize.sync({ force: true }); // Drops & recreates tables

//     // Create users
//     const users = [];
//     for (let i = 0; i < USERS_COUNT; i++) {
//       const hashedPassword = await bcrypt.hash('password123', 10);
//       const user = await User.create({
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         password: hashedPassword,
//         skills: [faker.hacker.verb(), faker.hacker.noun()].join(','),
//         isAdmin: false
//       });
//       users.push(user);
//     }

//     // Create admin user
//     const hashedAdminPassword = await bcrypt.hash('password123', 10);
//     const admin = await User.create({
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: hashedAdminPassword,
//       skills: 'Admin,Moderation',
//       isAdmin: true
//     });
//     users.push(admin);

//     Create posts
//     const posts = [];
//       for (const user of users) {
//         const postCount = faker.number.int({ min: POSTS_MIN, max: POSTS_MAX });
//         for (let i = 0; i < postCount; i++) {
//           const post = await Post.create({
//             userId: user.id,
//             content: faker.lorem.paragraph()
//           });
//           posts.push(post);
//         }
//     }

//     // Create comments
//     // const comments = [];
//     // for (const post of posts) {
//     //   const commentCount = faker.number.int({ min: COMMENTS_MIN, max: COMMENTS_MAX });
//     //   for (let i = 0; i < commentCount; i++) {
//     //     const commenter = faker.helpers.arrayElement(users);
//     //     const comment = await Comment.create({
//     //       postId: post.id,
//     //       userId: commenter.id,
//     //       text: faker.lorem.sentence()
//     //     });
//     //     comments.push(comment);

//     //     // Notification for comment
//     //     if (post.userId !== commenter.id) {
//     //       await Notification.create({
//     //         recipientId: post.userId,
//     //         senderId: commenter.id,
//     //         type: 'comment',
//     //         postId: post.id
//     //       });
//     //     }
//     //   }
//     // }

//     // Add likes to posts and comments (using through table or simple array depending on your schema)
//     // for (const post of posts) {
//     //   const likeUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 5 }));
//     //   for (const liker of likeUsers) {
//     //     // Assuming you have a PostLike model
//     //     await post.addLike(liker);

//     //     if (post.userId !== liker.id) {
//     //       await Notification.create({
//     //         recipientId: post.userId,
//     //         senderId: liker.id,
//     //         type: 'like',
//     //         postId: post.id
//     //       });
//     //     }
//     //   }
//     // }

//     // for (const comment of comments) {
//     //   const likeUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 4 }));
//     //   for (const liker of likeUsers) {
//     //     // Assuming you have a CommentLike model
//     //     await comment.addLike(liker);

//     //     if (comment.userId !== liker.id) {
//     //       await Notification.create({
//     //         recipientId: comment.userId,
//     //         senderId: liker.id,
//     //         type: 'like',
//     //         postId: comment.postId
//     //       });
//     //     }
//     //   }
//     // }

//     // Create random followers
//   //   for (const user of users) {
//   //     const followees = faker.helpers.arrayElements(users.filter(u => u.id !== user.id), faker.number.int({ min: 2, max: 5 }));
//   //     for (const followee of followees) {
//   //       // Assuming you have a UserFollowers join table (many-to-many)
//   //       await user.addFollowing(followee);

//   //       await Notification.create({
//   //         recipientId: followee.id,
//   //         senderId: user.id,
//   //         type: 'follow'
//   //       });
//   //     }
//   //   }

//     console.log('Seeding completed!');
//     await sequelize.close();
//   } catch (err) {
//     console.error(err);
//     await sequelize.close();
//   }
// };

// seedData();

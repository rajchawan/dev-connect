const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Notification = require('./models/Notification');

mongoose.connect('mongodb://localhost:27017/devconnect')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const USERS_COUNT = 10;

const seedData = async () => {
  await mongoose.connection.dropDatabase();

  const users = [];

  // Create regular users
  for (let i = 0; i < USERS_COUNT; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      skills: [faker.hacker.verb(), faker.hacker.noun()],
      isAdmin: false,
    });
    await user.save();
    users.push(user);
    console.log(`Created user: ${user.email}`);
  }

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('password123', 10);
  const admin = new User({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedAdminPassword,
    isAdmin: true,
    skills: ['Admin', 'Moderation']
  });
  await admin.save();
  users.push(admin);
  console.log('Created admin user');

  const posts = [];

  // Create posts for each user
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < postCount; i++) {
      const post = new Post({
        user: user._id,
        content: faker.lorem.paragraph(),
        likes: []
      });
      await post.save();
      posts.push(post);
    }
  }

  const comments = [];

  // Create comments for each post
  for (const post of posts) {
    const commentCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < commentCount; i++) {
      const commenter = faker.helpers.arrayElement(users);
      const comment = new Comment({
        post: post._id,
        user: commenter._id,
        text: faker.lorem.sentence(),
        likes: []
      });
      await comment.save();
      comments.push(comment);

      // Notification for comment
      if (String(post.user) !== String(commenter._id)) {
        await Notification.create({
          recipient: post.user,
          sender: commenter._id,
          type: 'comment',
          post: post._id
        });
      }
    }
  }

  // Add likes to posts and comments
  for (const post of posts) {
    const likeUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 0, max: 3 }));
    for (const liker of likeUsers) {
      if (!post.likes.includes(liker._id)) {
        post.likes.push(liker._id);

        // Notification for like
        if (String(post.user) !== String(liker._id)) {
          await Notification.create({
            recipient: post.user,
            sender: liker._id,
            type: 'like',
            post: post._id
          });
        }
      }
    }
    await post.save();
  }

  for (const comment of comments) {
    const likeUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 0, max: 2 }));
    for (const liker of likeUsers) {
      if (!comment.likes.includes(liker._id)) {
        comment.likes.push(liker._id);
        await Notification.create({
          recipient: comment.user,
          sender: liker._id,
          type: 'like',
          post: comment.post
        });
      }
    }
    await comment.save();
  }

  // Random followers
  for (const user of users) {
    const followees = faker.helpers.arrayElements(users.filter(u => u._id !== user._id), faker.number.int({ min: 1, max: 4 }));
    for (const followee of followees) {
      if (!user.following.includes(followee._id)) {
        user.following.push(followee._id);
        followee.followers.push(user._id);
        await Notification.create({
          recipient: followee._id,
          sender: user._id,
          type: 'follow'
        });
      }
    }
    await user.save();
  }

  console.log('Seeding completed!');
  mongoose.disconnect();
};

seedData();

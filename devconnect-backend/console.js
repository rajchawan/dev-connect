// Load environment variables
require('dotenv').config();

const mongoose = require('mongoose');

// Load your models
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
  console.log('💡 You can now run commands like: await User.find()');
  console.log('🧪 Models available: User, Post');

  // Attach models to the global object
  global.User = User;
  global.Post = Post;
});

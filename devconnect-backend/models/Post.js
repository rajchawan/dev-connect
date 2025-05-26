const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  content: { 
    type: String, 
    required: [true, 'Post content is required'], 
    minlength: [1, 'Post cannot be empty'], 
    maxlength: [1000, 'Post content is too long (max 1000 characters)']
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);

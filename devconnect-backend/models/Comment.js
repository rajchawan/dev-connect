const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: [true, 'Post ID is required'] 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  text: { 
    type: String, 
    required: [true, 'Comment text is required'], 
    minlength: [1, 'Comment cannot be empty'], 
    maxlength: [500, 'Comment text is too long (max 500 characters)'] 
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);

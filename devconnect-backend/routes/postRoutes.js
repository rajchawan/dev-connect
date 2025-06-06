const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateInput = require('../middlewares/validateInput');
const upload = require('../middlewares/upload');

// Create post with image upload
router.post(
  '/',
  upload.single('image'),
  auth,
  [body('content').notEmpty()],
  validateInput,
  postController.createPost
);

// Get all posts (with optional search query)
router.get('/', auth, postController.getPosts);

// Like a post
router.put('/:id/like', auth, postController.likePost);

module.exports = router;

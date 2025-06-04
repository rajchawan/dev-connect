const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Authenticated user's own data
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);

// Avatar update
router.put('/profile', auth, upload.single('avatar'), userController.updateProfile);

// Follow another user
router.post('/:id/follow', auth, userController.followUser);

// Admin: list/search users
router.get('/', auth, userController.getAllUsers);  // secured by admin check inside controller

// Get a specific user by ID
router.get('/:id', auth, userController.getUserById);

module.exports = router;

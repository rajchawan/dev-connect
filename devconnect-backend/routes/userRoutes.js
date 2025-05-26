const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.get('/search', auth, userController.searchUsers);
router.post('/:id/follow', auth, userController.followUser);
router.get('/:id', auth, userController.getUserById);
router.put('/profile', auth, upload.single('avatar'), userController.updateProfile);

module.exports = router;

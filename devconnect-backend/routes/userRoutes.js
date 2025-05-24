const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/me', auth, userController.getProfile);           // ✅ Corrected from getMyProfile
router.put('/me', auth, userController.updateProfile);
router.get('/search', auth, userController.searchUsers);
router.post('/:id/follow', auth, userController.followUser);
router.get('/:id', auth, userController.getUserById);

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');

router.use(auth, isAdmin);
router.get('/users', adminController.getAllUsers);
router.delete('/user/:id', adminController.deleteUser);
// router.delete('/post/:id', adminController.deletePost);

module.exports = router;
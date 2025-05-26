const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const checkRole = require('../middlewares/roleCheck'); // Include this line

router.use(auth, isAdmin);

router.get('/users', adminController.getAllUsers);
router.delete('/user/:id', checkRole('admin'), adminController.deleteUser);

module.exports = router;

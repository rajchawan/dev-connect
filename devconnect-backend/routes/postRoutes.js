const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateInput = require('../middlewares/validateInput');

router.post('/', auth, [body('content').notEmpty()], validateInput, postController.createPost);
router.get('/', auth, postController.getPosts);
// router.get('/:id', auth, postController.getPostById);
router.put('/:id/like', auth, postController.likePost);

module.exports = router;
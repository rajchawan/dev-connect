const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/authMiddleware');

router.post('/:postId', auth, commentController.addComment);
router.put('/:id/like', auth, commentController.likeComment);
router.get('/post/:postId', auth, commentController.getCommentsByPost);

module.exports = router;
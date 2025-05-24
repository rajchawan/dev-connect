const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { body } = require('express-validator');
const validateInput = require('../middlewares/validateInput');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validateInput, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], validateInput, login);

router.post('/logout', logout);

module.exports = router;
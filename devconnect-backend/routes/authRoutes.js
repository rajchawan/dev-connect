const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const validateInput = require('../middlewares/validateInput');

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validateInput, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], validateInput, login);

module.exports = router;
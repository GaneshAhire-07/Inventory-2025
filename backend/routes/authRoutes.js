const express = require('express');
const { check } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('email').isEmail().withMessage('Valid email is required'),
    validate,
  ],
  signup
);

router.post(
  '/login',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  login
);

module.exports = router;
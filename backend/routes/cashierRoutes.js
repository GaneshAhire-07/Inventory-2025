const express = require('express');
const { check } = require('express-validator');
const { addCashier } = require('../controllers/cashierController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/',
  [
    check('Email_address').isEmail().withMessage('Valid email is required'),
    validate,
  ],
  addCashier
);

module.exports = router;
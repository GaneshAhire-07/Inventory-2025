const express = require('express');
const { check } = require('express-validator');
const { createBill } = require('../controllers/billingController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/new-bill',
  [
    check('Customer_id').isMongoId().withMessage('Valid customer ID is required'),
    check('Bought_Products').isArray({ min: 1 }).withMessage('Bought products must be a non-empty array'),
    check('Bought_Products.*.product_id').notEmpty().withMessage('Product ID is required'),
    check('Bought_Products.*.Quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    validate,
  ],
  createBill
);

module.exports = router;
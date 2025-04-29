const express = require('express');
const { check } = require('express-validator');
const { createPurchase } = require('../controllers/purchaseController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/',
  [
    check('Date').isISO8601().withMessage('Valid date is required'),
    check('Supplier_Name').notEmpty().withMessage('Supplier name is required'),
    check('Input_Products').isArray({ min: 1 }).withMessage('Input products must be a non-empty array'),
    check('Input_Products.*.Product_Names').notEmpty().withMessage('Product name is required'),
    check('Input_Products.*.Quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    validate,
  ],
  createPurchase
);

module.exports = router;
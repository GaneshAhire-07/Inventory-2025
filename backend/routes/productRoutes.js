const express = require('express');
const { check } = require('express-validator');
const { addProduct, getProductsByCategory } = require('../controllers/productController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/add',
  [
    check('product_id').notEmpty().withMessage('Product ID is required'),
    check('product_name').notEmpty().withMessage('Product name is required'),
    check('product_qty').isInt({ min: 1 }).withMessage('Product quantity must be a positive integer'),
    check('units').notEmpty().withMessage('Units are required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('product_price').isFloat({ min: 0 }).withMessage('Product price must be a non-negative number'),
    check('expiry_date').isISO8601().withMessage('Valid expiry date is required'),
    validate,
  ],
  addProduct
);

router.post(
  '/',
  [
    check('Category').notEmpty().withMessage('Category is required'),
    validate,
  ],
  getProductsByCategory
);

module.exports = router;
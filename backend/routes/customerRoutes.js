const express = require('express');
const { check } = require('express-validator');
const { addCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/',
  [
    check('customer_name').notEmpty().withMessage('Customer name is required'),
    check('mobile_no').isMobilePhone().withMessage('Valid mobile number is required'),
    validate,
  ],
  addCustomer
);

router.get('/', getAllCustomers);

router.get('/:id', getCustomerById);

router.put(
  '/:id',
  [
    check('customer_name').notEmpty().withMessage('Customer name is required'),
    check('mobile_no').isMobilePhone().withMessage('Valid mobile number is required'),
    validate,
  ],
  updateCustomer
);

router.delete('/:id', deleteCustomer);

module.exports = router;
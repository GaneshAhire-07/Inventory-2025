const express = require('express');
const { check } = require('express-validator');
const { addSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } = require('../controllers/supplierController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post(
  '/',
  [
    check('supplier_name').notEmpty().withMessage('Supplier name is required'),
    check('mobile_no').isMobilePhone().withMessage('Valid mobile number is required'),
    check('company_name').notEmpty().withMessage('Company name is required'),
    validate,
  ],
  addSupplier
);

router.get('/', getAllSuppliers);

router.get('/:id', getSupplierById);

router.put(
  '/:id',
  [
    check('supplier_name').notEmpty().withMessage('Supplier name is required'),
    check('mobile_no').isMobilePhone().withMessage('Valid mobile number is required'),
    check('company_name').notEmpty().withMessage('Company name is required'),
    validate,
  ],
  updateSupplier
);

router.delete('/:id', deleteSupplier);

module.exports = router;
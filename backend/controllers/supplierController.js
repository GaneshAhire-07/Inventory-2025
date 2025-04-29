const { Supplier } = require('../lib/db.js');

const addSupplier = async (req, res, next) => {
  try {
    const { supplier_name, mobile_no, company_name } = req.body;
    const supplier = new Supplier({ supplier_name, mobile_no, company_name });
    await supplier.save();
    res.status(201).json({ message: 'Supplier Added Successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }
    next(err);
  }
};

const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    next(err);
  }
};

const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier Not Found' });
    }
    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { supplier_name, mobile_no, company_name } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      id,
      { supplier_name, mobile_no, company_name },
      { new: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier Not Found' });
    }
    res.status(200).json({ message: 'Supplier Updated Successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }
    next(err);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier Not Found' });
    }
    res.status(200).json({ message: 'Supplier Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier };
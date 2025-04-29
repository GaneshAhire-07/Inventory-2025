const { Customer } = require('../lib/db.js');

const addCustomer = async (req, res, next) => {
  try {
    const { customer_name, mobile_no } = req.body;
    const customer = new Customer({ customer_name, mobile_no });
    await customer.save();
    res.status(201).json({
      message: 'Customer Added Successfully',
      customer: {
        _id: customer._id,
        customer_name: customer.customer_name,
        mobile_no: customer.mobile_no
      }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }
    next(err);
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer Not Found' });
    }
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customer_name, mobile_no } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      id,
      { customer_name, mobile_no },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ message: 'Customer Not Found' });
    }
    res.status(200).json({ message: 'Customer Updated Successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer Not Found' });
    }
    res.status(200).json({ message: 'Customer Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  product_qty: { type: Number, required: true },
  units: { type: String, required: true },
  category_id: { type: String, required: true },
  product_price: { type: Number, required: true },
  expiry_date: { type: Date, required: true },
});

const customerSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  mobile_no: { type: String, required: true, unique: true },
});

const supplierSchema = new mongoose.Schema({
  supplier_name: { type: String, required: true },
  mobile_no: { type: String, required: true, unique: true },
  company_name: { type: String, required: true },
});

const cashierSchema = new mongoose.Schema({
  email_address: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Supplier = mongoose.model('Supplier', supplierSchema);
const Cashier = mongoose.model('Cashier', cashierSchema);

module.exports = { User, Product, Customer, Supplier, Cashier };
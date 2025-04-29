const { Product } = require('../lib/db.js');

const addProduct = async (req, res, next) => {
  try {
    const { product_id, product_name, product_qty, units, category, product_price, expiry_date } = req.body;
    const product = new Product({
      product_id,
      product_name,
      product_qty,
      units,
      category_id: category,
      product_price,
      expiry_date,
    });
    await product.save();
    res.status(201).json({ message: 'Added Product Successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Product ID already exists' });
    }
    next(err);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const { Category } = req.body;
    const products = await Product.find({ category_id: Category });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given category' });
    }
    res.status(200).json({
      count: products.length,
      results: products.map(product => ({
        product_id: product.product_id,
        product_name: product.product_name,
        product_qty: product.product_qty,
        units: product.units,
        category: product.category_id,
        product_price: product.product_price,
        expiry_date: product.expiry_date,
      })),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, getProductsByCategory };
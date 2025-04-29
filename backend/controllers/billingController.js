const { Customer, Product } = require('../lib/db.js');

const createBill = async (req, res, next) => {
  try {
    const { Customer_id, Bought_Products } = req.body;
    const customer = await Customer.findById(Customer_id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer Not Found' });
    }
    const billNo = Math.floor(Math.random() * 10000);
    let totalAmount = 0;
    const outputProducts = [];

    for (const [index, product] of Bought_Products.entries()) {
      const productData = await Product.findOne({ product_id: product.product_id });
      if (!productData) {
        return res.status(404).json({ message: `Product ${product.product_id} not found` });
      }
      const netAmount = product.Quantity * productData.product_price;
      totalAmount += netAmount;
      outputProducts.push({
        Sr_No: index + 1,
        Product_id: productData.product_id,
        Product_Name: productData.product_name,
        Quantity: product.Quantity,
        Price: productData.product_price,
        Net_Amount: netAmount,
      });
    }

    res.status(200).json({
      Customer_Name: customer.customer_name,
      Bill_No: billNo,
      Total_Amount: totalAmount,
      Bought_Products: outputProducts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBill };
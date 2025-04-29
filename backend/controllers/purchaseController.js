const { Supplier, Product } = require('../lib/db.js');

const createPurchase = async (req, res, next) => {
  try {
    const { Date, Supplier_Name, Input_Products } = req.body;
    const supplier = await Supplier.findOne({ supplier_name: Supplier_Name });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    const Bill_No = Math.floor(Math.random() * 10000);
    const outputProducts = [];

    for (const [index, product] of Input_Products.entries()) {
      const productData = await Product.findOne({ product_name: product.Product_Names });
      if (!productData) {
        return res.status(404).json({ message: `Product ${product.Product_Names} not found` });
      }
      const Net_Amount = product.Quantity * productData.product_price;
      outputProducts.push({
        Sr_No: index + 1,
        Product_id: productData.product_id,
        Quantity: product.Quantity,
        Price: productData.product_price,
        Net_Amount,
      });
    }

    res.status(200).json({
      Supplier_Name: supplier.supplier_name,
      Mobile_No: supplier.mobile_no,
      Company_Name: supplier.company_name,
      Bill_No,
      Output_Products: outputProducts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPurchase };
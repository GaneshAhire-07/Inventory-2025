const { Cashier } = require('../lib/db.js');

const addCashier = async (req, res, next) => {
  try {
    const { Email_address } = req.body;
    const cashier = new Cashier({ email_address: Email_address });
    await cashier.save();
    res.status(200).json({ email: Email_address });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    next(err);
  }
};

module.exports = { addCashier };
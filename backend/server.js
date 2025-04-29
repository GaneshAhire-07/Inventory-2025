const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config({ path: '/home/vaishnavi/inventory-management/backend/.env' });

// Then import and use connectDB
const connectDB  = require('./lib/con.js');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const cashierRoutes = require('./routes/cashierRoutes');
const billingRoutes = require('./routes/billingRoutes');

// Fix MaxListenersExceededWarning
require('events').EventEmitter.defaultMaxListeners = 15;

console.log('MONGO_URI:', process.env.MONGO_URI || 'undefined');
console.log('PORT:', process.env.PORT || 'undefined');

// Validate MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB after validating environment variables
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB

app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/products', productRoutes);
app.use('/v2/purchases', purchaseRoutes);
app.use('/v1/customers', customerRoutes);
app.use('/v1/suppliers', supplierRoutes);
app.use('/v1/cashiers', cashierRoutes);
app.use('/v1/billing', billingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// lib/con.js - minimal approach
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use direct connection string with minimal options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
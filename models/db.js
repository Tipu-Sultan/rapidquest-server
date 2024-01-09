const mongoose = require("mongoose");
require('dotenv').config();

const MONGOURI = process.env.MONGOURI;
async function main() {
  try {
    await mongoose.connect(MONGOURI);

    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = main;
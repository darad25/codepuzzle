// Install required packages: npm install express axios mongoose
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gas_prices', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a MongoDB schema and model for gas prices
const gasPriceSchema = new mongoose.Schema({
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const GasPrice = mongoose.model('GasPrice', gasPriceSchema);

function extractMedGasPrice(html) {
    const $ = cheerio.load(html);
    // Modify this selector based on the actual HTML structure of the page
    const medGasPriceElement = $('.med-gas-price');
  
    if (medGasPriceElement.length > 0) {
      // Extract the value from the element (assuming it's a text node)
      return parseFloat(medGasPriceElement.text().trim());
    } else {
      console.error('Med Gas Price element not found on the page.');
      return null; // or handle the absence of the element in another way
    }
  }
// Scraping and storing data
setInterval(async () => {
  try {
    const response = await axios.get('https://snowtrace.io/');
    const medGasPrice =  extractMedGasPrice(response.data); // Extract the 'Med Gas Price' value from the response HTML (use a HTML parser like Cheerio or regex).

    // Store the value in the database
    const gasPrice = new GasPrice({ value: medGasPrice });
    await gasPrice.save();
  } catch (error) {
    console.error('Error scraping data:', error.message);
  }
}, 1800000); // Run every half hour

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Add a product
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.create({ name, description, price });
  res.json(product);
});

module.exports = router;

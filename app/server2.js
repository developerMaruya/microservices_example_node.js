// app/server2.js
const express = require('express');
const app = express();
const productsDB = require('../db2/products');

app.use(express.json());

// Insert a product into the second database
app.post('/products', (req, res) => {
  const product = req.body;
  productsDB.insertProduct(product)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get all products' details from the second database
app.get('/products', (req, res) => {
  productsDB.getProducts()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(4000, () => {
  console.log('Server 2 listening on port 4000...');
});

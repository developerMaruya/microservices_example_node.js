// db2/products.js
const connection = require('./connections');

// Insert a product into the products table of the second database
function insertProduct(product) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(query, [product.name, product.price], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Get all products from the products table of the second database
function getProducts() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  insertProduct,
  getProducts,
};

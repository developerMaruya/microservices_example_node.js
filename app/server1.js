// app/server1.js
const express = require('express');
const app = express();
const usersDB = require('../db1/user');
const productsDB=require("../db2/products")
const connectionToFirstDB=require("../db1/connection")
const connectionToSecondDB=require("../db2/connections")

app.use(express.json());

// Insert a user into the first database
app.post('/users', (req, res) => {
  const user = req.body;
  usersDB.insertUser(user)
    .then(() => {
      res.json({
        statuscode:"201k",
        status:"successfull",
        message:"user created sucessfully"
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
// update user the first database
app.patch('/users', (req, res) => {
  const user = req.body;
  usersDB.UserUpdate(user)
    .then(() => {
      res.json({
        statuscode:"201k",
        status:"successfull",
        message:"update sucessfully"
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
// DELETE user the first database
app.delete('/users', (req, res) => {
  const user = req.body;
  usersDB.Userdeleted(user)
    .then(() => {
      res.json({
        statuscode:"201k",
        status:"successfull",
        message:"delete user sucessfully"
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get all users' details from the first database
app.get('/users', (req, res) => {
  usersDB.getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>both table data change single api>>>>>>>>>>>>>>>>>>>>>>> 
// Retrieve details from both databases and tables
app.get('/details', async (req, res) => {
  try {
    const users = await usersDB.getUsers();
    const products = await productsDB.getProducts();

    const details = users.map((user, index) => ({
      id: user.id,
      username: user.username,
      address: user.address,
      name: products[index].name,
      price: products[index].price
    }));

    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update details (both table inside both db automaticaly update data )
app.put('/update1', async (req, res) => {
  try {
    const { id, username, address, name, price } = req.body;

    // Update users table in the first database
    await updateUserInFirstDB(id, username, address);

    // Update products table in the second database
    await updateProductInSecondDB(id, name, price);

    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function updateUserInFirstDB(id, username, address) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE first_database.users SET username=?, address=? WHERE id=?';
    connectionToFirstDB.query(query, [username, address, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function updateProductInSecondDB(id, name, price) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE second_database.products SET name=?, price=? WHERE id=?';
    connectionToSecondDB.query(query, [name, price, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// insert data  for both table (both table inside both db automaticaly update data )
app.post('/addDetails', async (req, res) => {
  try {
    const {username, address, name, price } = req.body;

    // Update users table in the first database
    await addUserInFirstDB(username, address);

    // Update products table in the second database
    await addProductInSecondDB(name, price);

    res.json({ message: 'Data added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function addUserInFirstDB(username, address) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO first_database.users SET ?';
    const user = { username, address };
    connectionToFirstDB.query(query, user, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function addProductInSecondDB(name, price) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO second_database.products SET ?';
    const produ={name, price}
    connectionToSecondDB.query(query,produ,(err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


app.listen(3000, () => {
  console.log('Server 1 listening on port 3000...');
});

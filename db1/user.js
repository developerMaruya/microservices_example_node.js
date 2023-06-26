// db1/users.js
const connection = require('./connection');

// Insert a user into the users table of the first database
function insertUser(user) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, address) VALUES (?, ?)';
    connection.query(query, [user.username, user.address], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// update user 
function UserUpdate(user) {
  console.log(user)
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET username=?,address=? WHERE id=?';
    connection.query(query, [user.username, user.address,user.id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// delete user 
function Userdeleted(user) {
  console.log(user)
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE id=?';
    connection.query(query, [user.id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Get all users from the users table of the first database
function getUsers() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
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
  insertUser,
  getUsers,
  UserUpdate,
  Userdeleted
};

// db2/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'second_database',
});

module.exports = connection;

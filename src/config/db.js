const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',  // Direct string
  user: 'root',       // Direct string
  password: '',       // Empty string if no password
  database: 'db_duh_trends_test', // Direct string
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

var mysql = require('mysql2');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "task"
  });
  
module.exports = pool.promise();
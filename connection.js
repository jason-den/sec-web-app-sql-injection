var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hellosqlhbxz",
  database: "sql_hr",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log("Success connected to MySQL");
  } else {
    console.log("DB connection failed!");
  }
});

module.exports = connection;

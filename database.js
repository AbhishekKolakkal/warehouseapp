const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/warehouse.db');


// For Creating the Table 
db.run("CREATE TABLE products (productId INTEGER PRIMARY KEY, productName TEXT, productType TEXT, dateOfIn TEXT )");

// for Inserting Values in the database
db.serialize(() => {
  db.run("INSERT INTO products VALUES (123, 'Harry Potter T-shirt', 'T-shirt', '2018-7-9')");
  db.run("INSERT INTO products VALUES (124, 'Harry Potter Shorts', 'Shorts', '2018-7-8')");
  console.log("success"); 

});









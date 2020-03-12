var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jeu_tron"
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
// insertion 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO joueur (psudo,nom,prenom,email,mot_pass) VALUES ('lkkk', 'jjj','mmm','touazi.lylia@gmail.com','lol')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
*/
//select
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM joueur", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
var express = require('express');
var app = express();
var  bodyParser = require('body-parser');
var mysql = require('mysql');
const bcrypt = require('bcrypt')
var mot_pass_bas=null;
app.set('view-enigme','ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tron"
});


app.get('/',function(req,res){
  res.render('enregistrer.ejs');
});


app.post('/',function(req,res) {
	 bcrypt.hash (req.body.password, 10, function (err , hash) { 
 try{ console.log('coizejo');
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
   var sql = "INSERT INTO `joueur` (`psudo`,`nom`,`prenom`,`email`,`mot_pass`) VALUES ('" + req.body.psudo + "','" + req.body.nom + "', '" + req.body.prenom + "','" + req.body.email + "', '" +  hash + "')";
    con.query(sql,function(error) {
        if (error) { 
            console.log(error.message);
        } else {
            console.log('success',req.body.password);
            app.get('/',function(req,res){
    res.render('enregistrer.ejs');});
            
        }
    });
  res.redirect('/connecter')
  // res.render('connecter.ejs', {title: 'Express'})
  
  }
   
catch{
  res.redirect('/enregistrer')
  res.render('enregistrer.ejs', {title: 'Express'})}
 
})});
 
app.get('/connecter',function(req,res){
  res.render('connecter.ejs');
});
app.post('/connecter', function  (req, res) {
	
	var username = req.body.psudo;
	var password = req.body.mot_pass ;
	
	console.log(username,password)
	if (username && password) {
		con.query('SELECT * FROM joueur where psudo = ? ', [username], function(error, results, fields) {
console.log("hash",req.body.mot_pass)
console.log("results[0].mot_pass",results[0].mot_pass)
bcrypt.compare (req.body.mot_pass, results[0].mot_pass, function (err, result)  { 
        if (result == true) { 
            res.redirect('/jeu'); 
        } else { 
        
         res.redirect('/connecter') 
        } 		})
	

			
		});
	} else {
		 res.redirect('/connecter')
  			
		
		res.end();
	}
});

app.get('/jeu', function(request, res) {
	 res.render('jeu.ejs');
});

app.listen(3000,function(){
  console.log('Ecoute sur le port 3000');
});
module.exports = app











/*var mysql = require('mysql');

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

//select
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM joueur", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/
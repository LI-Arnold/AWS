var express = require('express');
var app = express();
var  bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user",
  database: "tron"
});


app.get('/',function(req,res){
	res.render('enregistrer.ejs');
});

app.post('/',function(req,res){
	console.log('coizejo');
	con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
	 var sql = "INSERT INTO `joueur` (`psudo`,`nom`,`prenom`,`email`,`mot_pass`) VALUES ('" + req.body.pseudo + "','" + req.body.nom + "', '" + req.body.prenom + "','" + req.body.email + "', '" + req.body.mdp1 + "')";
    con.query(sql,function(error) {
        if (error) { 
            console.log(error.message);
        } else {
            console.log('success');   
        }
    });
    res.render('enregistrer.ejs', {title: 'Express'});
});
	
//~ app.use(function(req, res, next){
    //~ res.setHeader('Content-Type', 'text/plain');
    //~ res.status(404).send('Page introuvable !');
//~ });

app.listen(3000,function(){
	console.log('Ecoute sur le port 3000');
});




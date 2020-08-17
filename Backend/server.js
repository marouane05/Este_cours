var express = require('express')
var app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser=require("body-parser");
const db = require("./Models/index");

/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'est_cours_plateforme'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
global.db = connection;
 */

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors()) ;


var Users = require('./Routes/UserRoute');
app.use('/users' , Users)

var Etudiant = require('./Routes/EtudiantRoute');
app.use('/etudiant',Etudiant)

var Professeur = require('./Routes/ProfesseurRoute');
app.use('/professeur',Professeur)

var Module = require('./Routes/ModuleRoute')
app.use('/module',Module)

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
});





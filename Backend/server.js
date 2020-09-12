var express = require('express')
var app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser=require("body-parser");
const db = require("./Models/index");
const session = require('express-session') 


// Attention il permet de réinitialiser toute la base de données

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

app.use(bodyParser.urlencoded({extended : true ,limit: "220mb",parameterLimit: 50000 }));

app.use(bodyParser.json({ limit: "220mb" }))
app.use(cors()) ;
app.use(express.static(path.resolve('./Cours')));
// Session Setup 
app.use(session({ 
  
  // It holds the secret key for session 
  secret: 'Your_Secret_Key', 

  // Forces the session to be saved 
  // back to the session store 
  resave: true, 

  // Forces a session that is "uninitialized" 
  // to be saved to the store 
  saveUninitialized: true
})) 



var Users = require('./Routes/UserRoute');
app.use('/users' , Users)

var Etudiant = require('./Routes/EtudiantRoute');
app.use('/etudiant',Etudiant)

var Professeur = require('./Routes/ProfesseurRoute');
app.use('/professeur',Professeur)

var Module = require('./Routes/ModuleRoute')
app.use('/module',Module)

var CoursExistant = require('./Routes/CoursExistantRoute')
app.use('/cours',CoursExistant)

var Commentaire = require('./Routes/CommentaireRoute')
app.use('/commentaire',Commentaire)
var Repcommentaire = require('./Routes/RepCommentaireRoute')
app.use('/repcommentaire',Repcommentaire)
app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
});





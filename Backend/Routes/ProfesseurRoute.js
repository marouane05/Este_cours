var express = require('express');
var cors = require('cors');
const professeur = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
const { request } = require('express');
const db = require("../Models");
const Professeur = db.professeur;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;

professeur.use(cors());
process.env.SECRET_KEY = 'secret'

// create
professeur.post('/add' , (req , res ) => {
  
    const professeurData = {
       nom : req.body.nom,
       prenom : req.body.prenom,
       depatement : req.body.departement,
       naissance: req.body.naissance,
       tele : req.body.tele ,
       email : req.body.email ,
       userId : parseInt(req.body.userId),
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Professeur.create(professeurData) .then(professeur => {
    res.json({status : professeur.email + ' registred !'})
})
.catch(err => {
    res.send('error' + err)
});

})

// update
professeur.put('/:professeurId' , (req, res) =>{

    Professeur.findOne({
where : {id : req.params.professeurId},
    })    .then(professeur =>{
        if(professeur){
            professeur.update({
                where : {id : req.params.professeurId},
                nom : req.body.nom,
                prenom : req.body.prenom,
                email : req.body.email,
                depatement : req.body.departement , 
                naissance: req.body.naissance,
                tele : req.body.tele ,
               
              })
        }else {
            res.send('Professeur does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

//// delete professeur
professeur.delete('/:professeurId' , (req , res) => {
   
    Professeur.findOne({
        where : {id : req.params.professeurId},
            })    .then(professeur =>{
                if(professeur){
                    professeur.destroy({
                        where : {id : req.params.professeurId},
                       
                      })
                      res.send('Professeur a été supprimé')
                }else {
                    res.send('Aucun étudiant correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All professeur  

professeur.get('/All' , (req , res) => {
    Professeur.findAll({
       
            })    .then(professeur =>{
                if(professeur){
                   res.send(professeur)
                }else {
                    res.send('Professeur does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 

});

// Get Professeur 

professeur.get('/:professeurId' , (req, res) =>{

    Professeur.findOne({
where : {id : req.params.professeurId},
    })    .then(professeur =>{
        if(professeur){
           res.send(professeur)
        }else {
            res.send('Professeur does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

module.exports = professeur ;
var express = require('express');
var cors = require('cors');
const etudiant = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
const { request } = require('express');
const db = require("../Models");
const Etudiant = db.etudiant;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


etudiant.use(cors());
process.env.SECRET_KEY = 'secret'


// create etudiant 
etudiant.post('/add' , (req , res ) => {
  
    const etudiantData = {
       nom : req.body.nom,
       prenom : req.body.prenom,
       cne : req.body.cne,
       naissance: req.body.naissance,
       tele : req.body.tele ,
       email : req.body.email , 
       FiliereId:parseInt(req.body.filiere),
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Etudiant.create(etudiantData) .then(user => {
    res.json({status : user.email + ' registred !'})
})
.catch(err => {
    res.send('error' + err)
});

})


// update etudiant 

etudiant.put('/:etudiantId' , (req, res) =>{

    Etudiant.findOne({
where : {id : req.params.etudiantId},
    })    .then(etudiant =>{
        if(etudiant){
            etudiant.update({
                where : {id : req.params.etudiantId},
                nom : req.body.nom,
                prenom : req.body.prenom,
                cne : req.body.cne,
                naissance: req.body.naissance,
                email : req.body.email,
                tele : req.body.tele ,
                FiliereId:parseInt(req.body.filiere),
              }
              )
              res.send('Eutdiant '+etudiant.nom +' '+etudiant.prenom+' est bien modifier')
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});


// delete etudiant
etudiant.delete('/:etudiantId' , (req , res) => {
   
    Etudiant.findOne({
        where : {id : req.params.etudiantId},
            })    .then(etudiant =>{
                if(etudiant){
                    etudiant.destroy({
                        where : {id : req.params.etudiantId},
                       
                      })
                      res.send('Eutdiant a été supprimé')
                }else {
                    res.send('Aucun étudiant correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All etudiant 

etudiant.get('/All' , (req , res) => {
    Etudiant.findAll({
       
            })    .then(etudiant =>{
                if(etudiant){
                   res.json(etudiant)
                }else {
                    res.send('Eutdiant does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 

});

// Get Etudiant 

etudiant.get('/:etudiantId' , (req, res) =>{

    Etudiant.findOne({
where : {id : req.params.etudiantId},
    })    .then(etudiant =>{
        if(etudiant){
           res.send(etudiant)
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});


module.exports = etudiant ;
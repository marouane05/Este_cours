var express = require('express');
var cors = require('cors');
const moduleUniversitaire = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
const { request } = require('express');
const db = require("../Models");
const Professeur = db.professeur;
const Filiere = db.filiere ; 
const Module = db.module ; 
const Op = db.Sequelize.Op;



moduleUniversitaire.use(cors());
process.env.SECRET_KEY = 'secret'


// create module 
moduleUniversitaire.post('/add' , (req , res ) => {
  
    const moduleData = {
       intitule : req.body.intitule,
       id_semestre : parseInt(req.body.semestre) ,
       FiliereId:parseInt(req.body.filiere),
       professeurId : parseInt(req.body.professeur),
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Module.create(moduleData) .then(module => {
    res.json({status : module.intitule + ' a été créer !'})
})
.catch(err => {
    res.send('error' + err)
});

})


// update module 

moduleUniversitaire.put('/:moduleId' , (req, res) =>{


    Module.findOne({
        where : {id : req.params.moduleId},
            })    .then(module =>{
                if(module){
                    module.update({
                        where : {id : req.params.moduleId},
                        intitule : req.body.intitule,
                        id_semestre : parseInt(req.body.semestre) , 
                        FiliereId:parseInt(req.body.filiere),
                        professeurId : parseInt(req.body.professeur),
                   
                      
                      }
                      )
                      res.send(module.intitule +' est bien modifier')
                }else {
                    res.send('module does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        


}); 


// delete module
moduleUniversitaire.delete('/:moduleId' , (req , res) => {
   
    Module.findOne({
        where : {id : req.params.moduleId},
            })    .then(module =>{
                if(module){
                    module.destroy({
                        where : {id : req.params.moduleId},
                       
                      })
                      res.send('module a été supprimé')
                }else {
                    res.send('Aucun module correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All module 

moduleUniversitaire.get('/All' , (req , res) => {
    Module.findAll({
       
            })    .then(module =>{
                if(module){
                   res.json(module)
                }else {
                    res.send('Aucun module')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 

});

// Get module 

moduleUniversitaire.get('/byFiliere/:filiereId' , (req , res) => {
    Module.findAll({
     where :{ FiliereId : req.params.filiereId}  
            })    .then(module =>{
                if(module){
                    res.send(module)
                }else {
                    res.send('Aucun module')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 

});





moduleUniversitaire.get('/:moduleId' , (req, res) =>{

    Module.findOne({
where : {id : req.params.moduleId},
    })    .then(module =>{
        if(module){
           res.send(module)
        }else {
            res.send('Aucun module ')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

/*
module.get('/mylist/:professeurId' , (req, res) =>{

    Module.findOne({
where : {professeurId : req.params.professeurId},
    })    .then(module =>{
        if(module){
           res.send(module)
        }else {
            res.send('Aucun module')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});
*/
module.exports = moduleUniversitaire ;
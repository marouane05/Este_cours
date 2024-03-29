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
const session = require('express-session');
const Etudiant = db.etudiant;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


etudiant.use(cors());
process.env.SECRET_KEY = 'secret'


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                console.log('token 1'+req.headers.authorization)
               console.log('token2' +session.SECRET_KEY)
                
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};



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
       userId : parseInt(req.body.userId),
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
if( req.body.sender=="notAdmin"){
    Etudiant.findOne({
        where : {id : req.params.etudiantId},
            })    .then(etudiant =>{
                if(etudiant){
                    etudiant.update({
                        where : {id : req.params.etudiantId},
                     
                        email : req.body.email,
                        tele : req.body.tele ,
                        
                      
                      }
                      )
                      res.send('Eutdiant '+etudiant.nom +' '+etudiant.prenom+' est bien modifier')
                }else {
                    res.send('Eutdiant does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        
} else {

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
        

}
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

etudiant.get('/All' ,authenticateJWT, (req , res) => {
  //  jwt.verify(req.body.token,session.SECRET_KEY)
  
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
etudiant.get('/detail/:userId' , (req, res) =>{

    Etudiant.findOne({
where : {id : req.params.userId},
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
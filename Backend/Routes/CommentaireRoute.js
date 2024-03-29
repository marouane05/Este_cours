var express = require('express');
var cors = require('cors');
const commentaire = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');

const { request } = require('express');
const db = require("../Models");
const session = require('express-session');
const Commentaire = db.commentaire;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


commentaire.use(cors());
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



// create commentaire 
commentaire.post('/add' , (req , res ) => {


    const commentaireData = {
       Commentaire : req.body.commentaire , 
       etudiantId:parseInt(req.body.etudiant),
       coursExistantId : parseInt(req.body.courId),
       autheur : req.body.autheur ,
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Commentaire.create(commentaireData) .then(comment => {
    res.json({status : comment.Commentaire + ' registred !'})
})
.catch(err => {
    res.send('error' + err)
});

})


// update commentaire 

commentaire.put('' , (req, res) =>{

    Commentaire.findOne({
        where : {id :req.body.id },
            })    .then(commentaire =>{
                if(commentaire){
                    commentaire.update({
                        where : {id : req.body.id},
                     
                        Commentaire : req.body.Commentaire
                        
                      
                      }
                      )
                      res.send('Commentaire est bien modifier')
                }else {
                    res.send('Commentaire n existe pas')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        

            

}); 


// delete commentaire
commentaire.delete('/:commentaireId' , (req , res) => {
   
    Commentaire.findOne({
        where : {id : req.params.commentaireId},
            })    .then(commentaire =>{
                if(commentaire){
                    commentaire.destroy({
                        where : {id : req.params.commentaireId},
                       
                      })
                      res.send('Commentaire a été supprimé')
                }else {
                    res.send('Aucun Commentaire correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All commentaire 

commentaire.get('/All/:courId' ,(req , res) => {
  //  jwt.verify(req.body.token,session.SECRET_KEY)
  
    Commentaire.findAll({
        where : {coursExistantId : req.params.courId},
            },
            
              )    .then(commentaire =>{
                if(commentaire){
                
                   /* const resObj=    commentaire.map(
                (comment)=> {
                    return Object.assign(
                        {},
                        {
                            id : comment.id,
                            Commentaire : comment.Commentaire,
                            createdAt : comment.createdAt,
                            updatedAt : comment.updatedAt,
                            etudiant : comment.etudiant.map(
                                (etudiant) =>{
                                return Object.assign({},{
                                    etudiant_id : etudiant.id,
                                    etudiant_nom : etudiant.nom,
                                    etudiant_prenom : etudiant.prenom ,
                                }
                                    )
                                }

                            ) 

                        })
                            
                }



                    )
                    res.json(resObj) */

                 const resObj=    commentaire.map(
                        (comment)=> {
                            return Object.assign(
                                {},
                                {
                                    id : comment.id,
                                    Commentaire : comment.Commentaire,
                                    autheur : comment.autheur,
                                    etudiantId : comment.etudiantId,
                                    createdAt : (comment.createdAt).toGMTString() ,
                                    updatedAt : (comment.updatedAt).toGMTString(),}
                            )})

                   res.send(resObj)
                }else {
                    res.send('Eutdiant does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 


});

// Get Commentaire 

commentaire.get('/:commentaireId' , (req, res) =>{

    Commentaire.findOne({
where : {id : req.params.commentaireId},
    })    .then(commentaire =>{
        if(commentaire){
           res.send(commentaire)
        }else {
            res.send('Commentaire does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});
commentaire.get('/detail/:userId' , (req, res) =>{

    Commentaire.findOne({
where : {id : req.params.userId},
    })    .then(commentaire =>{
        if(commentaire){
           res.send(commentaire)
        }else {
            res.send('Commentaire does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

module.exports = commentaire ;
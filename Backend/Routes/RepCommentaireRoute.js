var express = require('express');
var cors = require('cors');
const repcommentaire = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');

const { request } = require('express');
const db = require("../Models");
const session = require('express-session');
const Repcommentaire = db.repcommentaire;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


repcommentaire.use(cors());
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
repcommentaire.post('/add' , (req , res ) => {


    const repcommentaireData = {
       commentaire : req.body.repcommentaire , 
       professeurId : parseInt(req.body.professeur) , 
       commentaireId : parseInt(req.body.commentaireId),
       coursExistantId : parseInt(req.body.courId),
       autheur : req.body.autheur ,
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Repcommentaire.create(repcommentaireData) .then(repcomment => {
    res.json({status : 'registred !'})
})
.catch(err => {
    res.send('error' + err)
});

})


// update commentaire 

repcommentaire.put('' , (req, res) =>{

    Repcommentaire.findOne({
        where : {id :req.body.id },
            })    .then(repcommentaire =>{
                if(repcommentaire){
                    repcommentaire.update({
                        where : {id : req.body.id},
                     
                        commentaire : req.body.commentaire
                        
                      
                      }
                      )
                      res.send('Repcommentaire est bien modifier')
                }else {
                    res.send('Repcommentaire n existe pas')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        

            

}); 


// delete commentaire
repcommentaire.delete('/:commentaireId' , (req , res) => {
   
    Repcommentaire.findOne({
        where : {id : req.params.commentaireId},
            })    .then(commentaire =>{
                if(commentaire){
                    commentaire.destroy({
                        where : {id : req.params.commentaireId},
                       
                      })
                      res.send('Repcommentaire a été supprimé')
                }else {
                    res.send('Aucun Repcommentaire correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All commentaire 

repcommentaire.get('/All/:courId' ,(req , res) => {
  //  jwt.verify(req.body.token,session.SECRET_KEY)
  
    Repcommentaire.findAll({
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
                            Repcommentaire : comment.Repcommentaire,
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
                                    commentaire : comment.commentaire,
                                    commentaireId : comment.commentaireId,
                                    autheur : comment.autheur,
                                    professeurId : comment.professeurId,
                                    courId : comment.coursExistantId,
                                    createdAt : (comment.createdAt).toGMTString() ,
                                    updatedAt : (comment.updatedAt).toGMTString(),}
                            )})

                   res.send(resObj)
                }else {
                    res.send('Commentaire does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 


});

// Get Repcommentaire 

repcommentaire.get('/:commentaireId' , (req, res) =>{

    Repcommentaire.findOne({
where : {id : req.params.commentaireId},
    })    .then(commentaire =>{
        if(commentaire){
           res.send(commentaire)
        }else {
            res.send('Repcommentaire does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

module.exports = repcommentaire ;
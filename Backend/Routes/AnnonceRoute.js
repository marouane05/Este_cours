var express = require('express');
var cors = require('cors');
const annonce = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');

const { request } = require('express');
const db = require("../Models");
const session = require('express-session');
const Annonce = db.annonce;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


annonce.use(cors());
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



// create annonce 
annonce.post('/add' , (req , res ) => {


    const annonceData = {
       contenu : req.body.contenu , 
       professeurId:parseInt(req.body.professeur),
       moduleId : parseInt(req.body.moduleId),
       autheur : req.body.autheur ,
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Annonce.create(annonceData) .then(ann => {
    res.send({ann})
})
.catch(err => {
    res.send('error' + err)
});

})


// update annonce 

annonce.put('' , (req, res) =>{

    Annonce.findOne({
        where : {id :req.body.id },
            })    .then(annonce =>{
                if(annonce){
                    annonce.update({
                        where : {id : req.body.id},
                     
                        contenu : req.body.contenu
                        
                      
                      }
                      )
                      res.send('Annonce est bien modifier')
                }else {
                    res.send('Annonce n existe pas')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        

            

}); 


// delete annonce
annonce.delete('/:annonceId' , (req , res) => {
   
    Annonce.findOne({
        where : {id : req.params.annonceId},
            })    .then(annonce =>{
                if(annonce){
                    annonce.destroy({
                        where : {id : req.params.annonceId},
                       
                      })
                      res.send('Annonce a été supprimé')
                }else {
                    res.send('Aucun Annonce correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All annonce 

annonce.get('/bymodule/:moduleId' ,(req , res) => {
  //  jwt.verify(req.body.token,session.SECRET_KEY)
  
    Annonce.findOne({
        where : {moduleId : req.params.moduleId},
        order: [
            ['createdAt', 'DESC'],
           
        ],
            },
            
            
          )    .then(ann =>{
                if(ann){
                
                   /* const resObj=    annonce.map(
                (ann)=> {
                    return Object.assign(
                        {},
                        {
                            id : ann.id,
                            Annonce : ann.Annonce,
                            createdAt : ann.createdAt,
                            updatedAt : ann.updatedAt,
                            etudiant : ann.etudiant.map(
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

                 const mapub=  Object.assign(
                                {},
                                {
                                    id : ann.id,
                                    contenu : ann.contenu,
                                    autheur : ann.autheur,
                                    professeurId : ann.professeurId,
                                    createdAt : (ann.createdAt).toGMTString() ,
                                    updatedAt : (ann.updatedAt).toGMTString(),}
                            )

                   res.send({mapub})
                }else {
                    res.send({mapub : null})
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 


});

// Get Annonce 

annonce.get('/:annonceId' , (req, res) =>{

    Annonce.findOne({
where : {id : req.params.annonceId},
    })    .then(annonce =>{
        if(annonce){
           res.send(annonce)
        }else {
            res.send('Annonce does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});

/*
annonce.get('/detail/:userId' , (req, res) =>{

    Annonce.findOne({
where : {id : req.params.userId},
    })    .then(annonce =>{
        if(annonce){
           res.send(annonce)
        }else {
            res.send('Annonce does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});
*/

module.exports = annonce ;
var express = require('express');
var cors = require('cors');
const vue = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');

const { request } = require('express');
const db = require("../Models");
const session = require('express-session');
const Vue = db.vue;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


vue.use(cors());
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



// create vue 
vue.post('/add' , (req , res ) => {


    const vueData = {
      
       etudiantId:parseInt(req.body.etudiant),
       coursExistantId : parseInt(req.body.cours),
   
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 Vue.create(vueData) .then(vue => {
    res.send({vue})
})
.catch(err => {
    res.send('error' + err)
});

})


// delete vue
vue.delete('/:coursId' , (req , res) => {
   
    Vue.findAll({
        where : {coursExistantId : req.params.coursId},
            })    .then(vue =>{
                if(vue){
                    vue.destroy({
                        where : {coursExistantId : req.params.coursId},
                       
                      })
                      res.send('Vue a été supprimé')
                }else {
                    res.send('Aucun Vue correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})


// Get Namber of Vues

vue.get('/:coursId' , (req, res) =>{

    Vue.findAndCountAll({
        where: {coursExistantId : req.params.coursId},
       
      }).then(function (result) {
        res.send(result)
      })
});





module.exports = vue ;
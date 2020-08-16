var express = require('express');
var cors = require('cors');
const users = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
const { request } = require('express');
const db = require("../Models");
const User = db.user;
const Op = db.Sequelize.Op;




users.use(cors());
process.env.SECRET_KEY = 'secret'

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

// Api pour Login //

users.post('/login' ,(req , res) =>{
   
  
   User.findOne(
       {where : {
    email : req.body.email
       }})
.then(user =>  {
    if(user) {
        if(bcryptjs.compareSync(req.body.password , user.password)){
            const payload = {
                id : user.id,
                username : user.username,
                email : user.email,
                type : user.type
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn : 1440
            })
        res.send(token)
        }else{
            res.json({error : "User does'nt exists"})
        }
    }else{
        res.json({error : "User does not exists"})
    }
})

})

// 


// Register User //

users.post('/register' , (req , res ) => {
    const today = new Date()

    const userData = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        type : req.body.type , 
        createdAt: new Date(),
        updatedAt: new Date()
    }

    User.findOne({
        where : {
            email : req.body.email , 
            username : req.body.username
        } 
       
    })
    .then(user => {
        if(!user){
            bcryptjs.hash(req.body.password, 10, (err,hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                   // res.json({status : user.email + ' registred !'})
                    res.send(user)
                })
                .catch(err => {
                    res.send('error' + err)
                })
            })
            
        }else{
            res.json({error : 'User already exists'})
        }
        
    })
    .catch(err => {
        res.send('error' +err)
    })
})

// //


users.get('/profile' ,(req , res) =>{
    var decoded = jwt.verify(req.headers['autorisation'] ,process.env.SECRET_KEY)
    User.findOne({ 
         where : {
        id : decoded.id
    }
})
    .then(user =>{
        if(user){
            res.json(user)
        }else {
            res.send('User does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    })
})


users.post('/profile' ,(req , res) =>{
    //var decoded = jwt.verify(req.headers['autorisation'] ,process.env.SECRET_KEY)
   // const decoded = jwt_decode(req.body.token)
  
   User.findOne({ 
         where : {
        id : req.body.id
    }
})
    .then(user =>{
        if(user){
           res.json(user)
         //   res.json('pass : '+bcryptjs.decrypt(user.password))
        }else {
            res.send('User does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    })
})



users.put('/:userId' , (req, res) =>{

    User.findOne({
where : {id : req.params.userId},
    })    .then(user =>{
        if(user){
            if(!req.body.password){
 
              
                user.update({
                    where : {id : req.params.userId},
                    username : req.body.username,
                    email : req.body.email,
               
                    
                  })
                  
                .then(user => {
                     res.json({status : user.email + ' a été modifier sans pass!'})
                 /* 
                 const payload = {
                        id : user.id,
                        username : user.username,
                        email : user.email,
                        type : user.type
                    }
                 
                        
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn : 1440
                    })
                 */   
                   
                   // res.send(token)
                })
                .catch(err => {
                    res.send('error crypte' + err)
                })
     
            } else {
                bcryptjs.hash(req.body.password, 10, (err,hash) => {
              
                    user.update({
                        where : {id : req.params.userId},
                        username : req.body.username,
                        email : req.body.email,
                        password : hash 
                        
                      })
                      
                    .then(user => {
                         res.json({status : user.email + ' a été modifier vc pass!'})
                     /* 
                     const payload = {
                            id : user.id,
                            username : user.username,
                            email : user.email,
                            type : user.type
                        }
                     
                            
                            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn : 1440
                        })
                     */   
                       
                       // res.send(token)
                    })
                    .catch(err => {
                        res.send('error crypte' + err)
                    })
                })
            }
           
        
             
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});






module.exports = users ;
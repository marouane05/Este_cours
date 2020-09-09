var express = require('express');
var cors = require('cors');
const coursExistant = express.Router()
var bcryptjs = require('bcryptjs');
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');
const { request } = require('express');
const db = require("../Models");
const session = require('express-session');
const { professeur } = require('../Models');
const CoursExistant = db.coursExistant;
const Filiere = db.filiere ; 
const Op = db.Sequelize.Op;


coursExistant.use(cors());
process.env.SECRET_KEY = 'secret'

// pour stocker les fichiers
var storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
        console.log('urL1'+req.params.fil)
        var distination ='./Videos/'+req.params.fil+'/'+req.params.module
        
        var distinationFil ='./Videos/'+req.params.fil
        var distinationModule = distinationFil+'/'+req.params.module
    //    console.log('urL2'+distination)

        if (!fs.existsSync(distinationFil)){
           // fs.mkdirSync(distination);
        
          //  const fs = require('fs').promises;
            fs.mkdirSync(distinationFil);
            fs.mkdirSync(distinationModule);
           
         
            cb(null, 'Videos/'+req.params.fil+'/'+req.params.module)
         



           
        } else if(!fs.existsSync(distinationModule)){
            fs.mkdirSync(distinationModule);
            cb(null, 'Videos/'+req.params.fil+'/'+req.params.module)
        } else {
            cb(null, 'Videos/'+req.params.fil+'/'+req.params.module)
        }
    
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
  })
  



  
  var upload = multer({ storage: storage  ,limits: { fileSize: 5242880 }}).array('file')
// fin fichier
  


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



// create coursExistant 
coursExistant.post('/add' , (req , res ) => {

console.log('recu '+ req.body.description)
var indice = ''
if(req.body.typeCours=='document'){
indice ='pdf'
}else if(req.body.typeCours=='video'){
indice = 'mp4'
}
for(let i=0 ; i< req.body.nombre ; i++){
    const coursExistantData = {
       intitule : req.body.intitule+'-chap'+i,
       module : req.body.module,
       description : req.body.description,
       FiliereId:parseInt(req.body.filiere),
       moduleId : parseInt(req.body.module),
       professeurId : parseInt(req.body.professeur),
       typeCours : req.body.typeCours,
       url : ''+req.body.url+'-chap'+i+'.'+indice , 
       createdAt: new Date(),
       updatedAt: new Date()
    }
    

 CoursExistant.create(coursExistantData) .then(coursExistant => {
    res.json({status : coursExistant.intitule + ' registred !'})
})
.catch(err => {
    res.send('error' + err)
});

}

})


// update coursExistant 

coursExistant.put('/:coursExistantId' , (req, res) =>{

    CoursExistant.findOne({
        where : {id : req.params.coursExistantId},
            })    .then(coursExistant =>{
                if(coursExistant){
                    CoursExistant.update({
                        where : {id : req.params.coursExistantId},
                        intitule : req.body.intitule,
                      
                      }
                      )
                      res.send('Cours '+coursExistant.nom +' '+coursExistant.prenom+' est bien modifier')
                }else {
                    res.send('Eutdiant does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
        


}); 


// delete coursExistant
coursExistant.delete('/:coursExistantId' , (req , res) => {
   
    CoursExistant.findOne({
        where : {id : req.params.coursExistantId},
            })    .then(coursExistant =>{
                if(coursExistant){
                    coursExistant.destroy({
                        where : {id : req.params.coursExistantId},
                       
                      })
                      res.send('Cours a été supprimé')
                }else {
                    res.send('Aucun cours correspond ces informations')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 
})

// Get All coursExistant 

coursExistant.get('/All' ,authenticateJWT, (req , res) => {
  //  jwt.verify(req.body.token,session.SECRET_KEY)
  
    CoursExistant.findAll({
       
            })    .then(coursExistant =>{
                if(coursExistant){
                   res.json(coursExistant)
                }else {
                    res.send('Cours does not exists')
                }
            }).catch(err =>{
                res.send('error' + err)
            }) 


});

// Get coursExistant 

coursExistant.get('/:coursExistantId' , (req, res) =>{

    CoursExistant.findOne({
where : {id : req.params.coursExistantId},
    })    .then(coursExistant =>{
        if(coursExistant){
           res.send(coursExistant)
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});


coursExistant.get('/prof/:professeurId' , (req, res) =>{


    CoursExistant.findAll({
where : {professeurId : req.params.professeurId},
    })    .then(coursExistant =>{
        if(coursExistant){
           res.send(coursExistant)
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});


coursExistant.get('/module/:moduleId' , (req, res) =>{

    CoursExistant.findAll({
where : {moduleId : req.params.moduleId},
    })    .then(coursExistant =>{
        if(coursExistant){
           res.send(coursExistant)
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});







/*
CoursExistant.get('/detail/:userId' , (req, res) =>{

    CoursExistant.findOne({
where : {id : req.params.userId},
    })    .then(coursExistant =>{
        if(coursExistant){
           res.send(coursExistant)
        }else {
            res.send('Eutdiant does not exists')
        }
    }).catch(err =>{
        res.send('error' + err)
    }) 
});
*/

/*
coursExistant.post('/upload/:fil/:module',function(req, res) {
    
    console.log('urL0 V2'+req.params.fil)
    console.log('vv'+req.params.module)
  

  upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.send(err)
           } else if (err) {
               return res.send(err)
           }
      res.send(res)
  
    })
  
 return res.status(200).send(req.file)
 

});
 */

 
coursExistant.post('/uploads/document/:fil/:module/:intitule',function(req, res) {
  let size = req.body.pdf.length ;
  console.log('nombre '+ req.body.pdf.length)
  for(i=0;i < size ; i++) {
let encod = req.body.pdf[i].substring(28)      //28 pdf
    let buff = Buffer.from(encod, 'base64'); 
 //   console.log('code: '+encod[0])


 var distination ='./Cours/'+req.params.fil+'/'+req.params.module
        
        var distinationFil ='./Cours/'+req.params.fil
        var distinationModule = distinationFil+'/'+req.params.module
        if (!fs.existsSync(distinationFil)){
           
            fs.mkdirSync(distinationFil);
            fs.mkdirSync(distinationModule);
            'Cours/'+req.params.fil+'/'+req.params.module
         
            fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.pdf', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved ');
              });
        } else if(!fs.existsSync(distinationModule)){
            fs.mkdirSync(distinationModule);

            
            fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.pdf', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved ');
              });


        
        } else {

            
            fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.pdf', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved ');
              });
           
        }






  }
  


  
 return res.status(200).send(req.file)
 

});




coursExistant.post('/uploads/video/:fil/:module/:intitule',function(req, res) {
    let size = req.body.pdf.length ;
    console.log('nombre '+ req.body.pdf.length)
    for(i=0;i < size ; i++) {
  let encod = req.body.pdf[i].substring(22)      //22 video
      let buff = Buffer.from(encod, 'base64'); 
   //   console.log('code: '+encod[0])
  
  
   var distination ='./Cours/'+req.params.fil+'/'+req.params.module
          
          var distinationFil ='./Cours/'+req.params.fil
          var distinationModule = distinationFil+'/'+req.params.module
          if (!fs.existsSync(distinationFil)){
             
              fs.mkdirSync(distinationFil);
              fs.mkdirSync(distinationModule);
              'Cours/'+req.params.fil+'/'+req.params.module
           
              fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.mp4', buff, (err) => {
           
                  if (err) throw err;
                  console.log('The binary data has been decoded and saved');
                });
          } else if(!fs.existsSync(distinationModule)){
              fs.mkdirSync(distinationModule);
  
              
              fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.mp4', buff, (err) => {
           
                  if (err) throw err;
                  console.log('The binary data has been decoded and saved ');
                });
  
  
          
          } else {
  
              
              fs.writeFile('./Cours/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'-chap'+i+'.mp4', buff, (err) => {
           
                  if (err) throw err;
                  console.log('The binary data has been decoded and saved ');
                });
             
          }
  
  
  
  
  
  
    }
    
  
  
    
   return res.status(200).send(req.file)
   
  
  });


/*
coursExistant.post('/uploads/:fil/:module/:intitule',function(req, res) {
  
let encod = req.body.pdf.substring(22)      //28 pdf
    let buff = Buffer.from(encod, 'base64'); 
 //   console.log('code: '+encod[0])


 var distination ='./Videos/'+req.params.fil+'/'+req.params.module
        
        var distinationFil ='./Videos/'+req.params.fil
        var distinationModule = distinationFil+'/'+req.params.module
        if (!fs.existsSync(distinationFil)){
           
            fs.mkdirSync(distinationFil);
            fs.mkdirSync(distinationModule);
            'Videos/'+req.params.fil+'/'+req.params.module
         
            fs.writeFile('./Videos/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'.mp4', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved to my-file.pdf');
              });
        } else if(!fs.existsSync(distinationModule)){
            fs.mkdirSync(distinationModule);

            
            fs.writeFile('./Videos/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'.mp4', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved to my-file.pdf');
              });


        
        } else {

            
            fs.writeFile('./Videos/'+req.params.fil+'/'+req.params.module+'/'+req.params.intitule+'.mp4', buff, (err) => {
         
                if (err) throw err;
                console.log('The binary data has been decoded and saved to my-file.pdf');
              });
           
        }






    
  


  
 return res.status(200).send(req.file)
 

});
*/








module.exports = coursExistant ;
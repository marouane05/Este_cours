

module.exports = (sequelize, Sequelize) => {
  
    const Commentaire = sequelize.define("commentaire", {
     Commentaire : {
        type: Sequelize.TEXT , 
        required: true
      },
    
    autheur : {

      type : Sequelize.STRING ,
      required : true 

    }  
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Commentaire;
  };


module.exports = (sequelize, Sequelize) => {
    const Repcommentaire = sequelize.define("repcommentaire", {
     commentaire : {
        type: Sequelize.STRING , 
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
  
    return Repcommentaire;
  };
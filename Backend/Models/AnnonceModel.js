

module.exports = (sequelize, Sequelize) => {
    const Annonce = sequelize.define("annonce", {
     contenu : {
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
  
    return Annonce;
  };
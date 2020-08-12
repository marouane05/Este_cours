

module.exports = (sequelize, Sequelize) => {
    const Professeur = sequelize.define("professeur", {
     nom : {
        type: Sequelize.STRING , 
        required: true
      },
     prenom : {
        type: Sequelize.STRING ,
        required: true
      },
     depatement: {
        type: Sequelize.STRING , 
        required: true
      },
      naissance : {
        type: Sequelize.DATE , 
        required: true
      },
     email : {
        type: Sequelize.STRING ,
        required: true
      },
     tele: {
        type: Sequelize.STRING , 
        required: true
      },

    
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Professeur;
  };
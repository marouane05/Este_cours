

module.exports = (sequelize, Sequelize) => {
    const Etudiant = sequelize.define("etudiant", {
     nom : {
        type: Sequelize.STRING , 
        required: true
      },
     prenom : {
        type: Sequelize.STRING ,
        required: true
      },
     cne: {
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
 
    return Etudiant;
  };


module.exports = (sequelize, Sequelize) => {
    const Filiere = sequelize.define("Filiere", {
     intitule : {
        type: Sequelize.STRING , 
        required: true
      }
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Filiere;
  };


module.exports = (sequelize, Sequelize) => {
    const Cours = sequelize.define("cours", {
     intitule : {
        type: Sequelize.STRING , 
        required: true
      },
    
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Cours;
  };
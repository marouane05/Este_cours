

module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("module", {
     intitule : {
        type: Sequelize.STRING , 
        required: true
      },
     id_semestre : {
         type : Sequelize.INTEGER ,
         required : true 
     }
    
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Module;
  };
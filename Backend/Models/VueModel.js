

module.exports = (sequelize, Sequelize) => {
    const Vue = sequelize.define("vue", {
    
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return Vue;
  };
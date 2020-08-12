

module.exports = (sequelize, Sequelize) => {
    const CoursExistant = sequelize.define("coursExistant", {
     intitule : {
        type: Sequelize.STRING , 
        required: true
      },
     url : {
         type : Sequelize.STRING(1234) ,
         required : true 
     }
    
     
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return CoursExistant;
  };
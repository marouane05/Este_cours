module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
     username : {
        type: Sequelize.STRING , 
        required: true
      },
     email: {
        type: Sequelize.STRING ,
        required: true
      },
     type: {
        type: Sequelize.STRING , 
        required: true
      },
      password : {
          type : Sequelize.STRING , 
          required: true
      }
    /*  createdAt: new Date(),
      updatedAt: new Date()
    */},{
    freezeTableName: true
});
  
    return User;
  };
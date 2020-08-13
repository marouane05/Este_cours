const dbConfig = require("../DbConfig/config");

const Sequelize = require("sequelize");
const { request } = require("express");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./UserModel")(sequelize, Sequelize);
db.etudiant = require("./EtudiantModel")(sequelize,Sequelize);
db.professeur = require("./ProfesseurModel")(sequelize,Sequelize);
db.admin = require("./AdminModel")(sequelize,Sequelize);
db.module = require("./ModuleModel")(sequelize,Sequelize);
db.filiere = require("./FiliereModel")(sequelize,Sequelize);
db.cours = require("./CoursModel")(sequelize,Sequelize);
db.coursExistant = require("./CoursExistantModel")(sequelize,Sequelize);
db.commentaire = require("./CommentaireModel")(sequelize,Sequelize);
db.vue = require("./VueModel")(sequelize,Sequelize);

// définition des associations 
db.professeur.hasMany(db.module,{as:'module'})
//db.filiere.hasMany(db.professeur,{as:'professeur'});
db.filiere.hasMany(db.etudiant,{as:'etudiant'});
db.filiere.hasMany(db.module,{as:'module'});
db.professeur.hasMany(db.cours,{as: 'cours'});
db.coursExistant.hasMany(db.cours,{as:'cours'});
db.etudiant.hasMany(db.commentaire,{as:'commentaire'})
db.cours.hasMany(db.commentaire,{as:'commentaire'})
db.etudiant.hasMany(db.vue,{as:'vue'})
db.cours.hasMany(db.vue,{as:'vue'})
/*
db.professeur.belongsTo(db.filiere, {
  foreignKey: "filiere_id",
  as: "filiere",
});
db.etudiant.belongsTo(db.filiere, {
  foreignKey: "filiere_id",
  as: "filiere",
});
db.module.belongsTo(db.filiere, {
  foreignKey: "filiere_id",
  as: "filiere",
});
db.module.belongsTo(db.professeur, {
  foreignKey: "professeur_id",
  as: "professeur",
});
*/
module.exports = db;
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
db.annonce = require("./AnnonceModel")(sequelize,Sequelize);
db.coursExistant = require("./CoursExistantModel")(sequelize,Sequelize);
db.commentaire = require("./CommentaireModel")(sequelize,Sequelize);
db.vue = require("./VueModel")(sequelize,Sequelize);
db.repcommentaire = require("./RepcommentaireModel")(sequelize,Sequelize);
// définition des associations 
db.professeur.hasMany(db.module,{as:'module'})
db.user.hasMany(db.etudiant,{as:'etudiant'})
db.user.hasMany(db.professeur,{as:'professeur'})
//db.filiere.hasMany(db.professeur,{as:'professeur'});
db.filiere.hasMany(db.etudiant,{as:'etudiant'});
db.filiere.hasMany(db.module,{as:'module'});


db.professeur.hasMany(db.annonce,{as: 'annonce'});
db.module.hasMany(db.annonce,{as: 'annonce'});

db.professeur.hasMany(db.repcommentaire,{as: 'repcommantaire'});
db.commentaire.hasMany(db.repcommentaire,{as: 'repcommantaire'});
db.coursExistant.hasMany(db.repcommentaire,{as: 'repcommantaire'});

db.etudiant.hasMany(db.commentaire,{as:'commentaire'})
db.coursExistant.hasMany(db.commentaire,{as:'commentaire'})
db.etudiant.hasMany(db.vue,{as:'vue'})
db.coursExistant.hasMany(db.vue,{as:'vue'})

db.filiere.hasMany(db.coursExistant,{as:'coursExistant'});
db.professeur.hasMany(db.coursExistant,{as: 'coursExistant'});
db.module.hasMany(db.coursExistant,{as: 'coursExistant'});

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
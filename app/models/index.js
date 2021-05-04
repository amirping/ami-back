const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.actuality=require("./actuality.model");
db.categories=require("./categories.model");
db.reclamation=require("./reclamation.model");
db.etape=require("./etape.model");
db.notification=require("./notification.model");
db.devis=require("./Devis.model");
db.garantie=require("./garantie.model");
db.devisautomobile=require("./DevisAutoMobile.model");
db.demandedevis=require("./DemandeDevis.model");
db.reclamationticket=require("./reclamationTicket.model");
db.ROLES = ["user", "admin"];

module.exports = db;
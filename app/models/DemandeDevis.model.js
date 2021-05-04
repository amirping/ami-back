const mongoose = require('mongoose');

const DemandeDevis=mongoose.model(
    "DemandeDevis",
    new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        gouvernerat:{type:String},
        ville:{type:String},
        agence:{type:String},
        homeType:{type:Boolean},//true=propriétaire && false=locataire
        nbrCh:{type:Number},
        valeurMobilier:{type:Number},
        garantie:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Garantie",
        }]
    },{timestamps:true})
);
module.exports=DemandeDevis;
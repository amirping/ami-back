const mongoose=require('mongoose');

const Devis=mongoose.model(
    "Devis",
    new mongoose.Schema({
        user:String,
        DevisAutoMobile:{type:mongoose.Schema.Types.ObjectId,ref:"DevisAutoMobile"},
        demandeDevis:{type:mongoose.Schema.Types.ObjectId,ref:"DemandeDevis"},
        timeLimit:Boolean,
        validity:Boolean,
    },{timestamps:true})
);
module.exports=Devis;
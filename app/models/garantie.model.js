const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const Garantie=mongoose.model(
    "Garantie",
    new mongoose.Schema({
        libelle:{
            type:String,
            default:"Responsabilité Civile"
        },
        limit:{
            type:Number,
            default:80000.000,
        },
        unite:{
            type:String,
            default:"DT"

        },
        // devisautomobile:{
        //     type:Schema.Types.ObjectId,
        //     ref:"DevisAutoMovile"
        // },
        // demandedevis:{
        //     type:Schema.Types.ObjectId,
        //     ref:"DemandeDevis"
        // }
    })
);
module.exports=Garantie;
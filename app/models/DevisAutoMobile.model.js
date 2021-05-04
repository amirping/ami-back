const mongoose = require('mongoose');

const DevisAutoMobile=mongoose.model(
    "DevisAutoMobile",
    new mongoose.Schema({
        user:{type:String},
        gouvernerat:{type:String},
        ville:{type:String},
        agence:{type:String},
        numMat:{type:String},
        marque:{type:String},
        nbrC:{type:Number},
        nbrP:{type:Number},
        DateCir:{type:Date},
        valeurV:{type:Number},
        contrat:{type:Boolean},
        garantie:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Garantie",
        }],
        validity:{
            type:Boolean,
            default:true,//true==valid && false==nonvalid
            
        },
        timeLimit:{
            type:Boolean,
            default:true//true==mezel mafetech && false== fet l time limit
        }
    },{timestamps:true})
);
module.exports =DevisAutoMobile;
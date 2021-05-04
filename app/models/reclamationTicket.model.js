const mongoose = require("mongoose");
const Reclamation = require("./reclamation.model");
const ticketReclamation = mongoose.model(
    "ticketReclamation",
    new mongoose.Schema({
        code:{
            type:String,
            // required:true,
            // unique:true,
        },
        reclamation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reclamation"
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        etape:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Etape"
            
        }
    },{timestamps:true})
);
module.exports=ticketReclamation;
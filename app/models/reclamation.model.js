const mongoose= require("mongoose");

const Reclamation =  mongoose.model(
    "Reclamation",
    new mongoose.Schema({
        ticket:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"ticketReclamation"

        },

        title:{
            type:String,
            default:null,
            
        },
        description:{
            default:null,
            type:String,
           

        },
    
        categorie:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Categories",
            default:null,
        }
    },{timestamps:true})
);
module.exports=Reclamation;
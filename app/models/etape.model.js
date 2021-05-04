const mongoose = require("mongoose");

const names=Object.freeze({
    onHold:'onHold',
    Active:'active',
    paused:'paused',
    completed:'completed',
});
const Etape = mongoose.model(
    "Etape",
    new mongoose.Schema({
        name:{
            type:String,
            enum:Object.values(names),
            default:'onHold'
            
        },
        ticket:{
           type:String
        }
    },{timestamps:true})
);
module.exports=Etape;
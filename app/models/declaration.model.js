const mongoose = require("mongoose");

const Declaration = mongoose.model(
    "Declaration",
    new mongoose.Schema({
        title:{
            type:String,
            required:true,
            
        },
        description:{
            type:String,
            required:true,
        },
        img:{
            type:String,
        },
        date:{
            type:Date,
            required:true,
        },
        location:{
            type:String,
            required:true,
        }
    },{timestamps:true})
);

module.exports = Declaration;
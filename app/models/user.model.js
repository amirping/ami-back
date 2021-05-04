const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname:{
      type:String,
      required:true,
      minlength:3,
    },
    lastname:{type:String,
    required:true,
    minlength:3},
    numtel:{
      type:Number,
      minlength:8,
      maxlength:8,
      required:true
    },
    username: {type:String,
    required:true,
    minlength:3},
    email: {type:String,
    required:true,
    },
    password: {type:String,
    required:true,
    minlength:8},
    role:{
      type:String,
      // required:true,
    },
    activite:{
      type:String,
      
    },
    numid:{
      type:Number,
      unique:true,
    },
    img:{
      type:String
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    status:{
      type:String,
      enum:['Pending','Active'],
      default:'Pending'
    },
    
    confirmationCode:{
      type:String,
      unique:true,
    }
    

  },{timestamps:true})
);

module.exports = User;

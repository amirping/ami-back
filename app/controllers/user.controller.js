const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const nodemailer=require("../config/nodemailer.config");
const Roles = db.role;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.getRoleById=(req,res)=>{
  Roles.findById(req.params.id)
    .then(roles=>res.json(roles))
    .catch(err=>res.status(400).json('error : '+err));
}
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


exports.findAll = (req, res) => {
  User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('error : '+err));
};
 exports.findUserByid = (req,res)=>{
   User.findById(req.params.id)
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('error : '+err));
 }
exports.DeleteUser= (req,res)=>{
  User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('USER DELETED'))
    .catch(err=>res.status(400).json('error : '+err));



}

exports.updateUser = (req,res)=>{
  if(!req.body){
    return res.status(400).send({
      message:"cannot be empty"
    });
  }
  const id=req.params.id;
  User.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
      if(!data){
        res.status(404).send({
          message:"cannot update user with id :"+id
        });
      }else res.send({message:"User updated successfully"});
      //socket.emit('notification','helloworld')
    })
    .catch(err=>{
      res.status(500).send({
        message:"Error updating User with id : "+id
      });
    })
}
 
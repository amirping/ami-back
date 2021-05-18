const config = require("../config/auth.config");
const db = require("../models");
const Declaration = db.declaration;
const nodemailer=require("../config/nodemailer.config");
const { declaration, notification } = require("../models");
const socket=require('socket.io');

exports.addDeclaration=(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const img=req.body.img;
    const location = req.body.location;
    const date  = req.body.date

    const newDeclaration= new Declaration({
        title,
        description,
        img,
        date,
        location
    });
    newDeclaration.save()
        .then(()=>res.json("Declaration added succesfully"))
        .catch(err=>res.status(400).json('error : '+err));

};
exports.listDeclaration = (req,res)=>{
    Declaration.find()
        .then(actualities=>res.json(actualities))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.getDeclarationById = (req,res)=>{
    Declaration.findById(req.params.id)
        .then(declaration=>res.json(declaration))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.deleteDeclaration = (req,res)=>{
    Declaration.findByIdAndDelete(req.params.id)
        .then(()=>res.json('DECLARATION DELETED'))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.updateDeclaration = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"cannot be empty"
        });
    }
    const id=req.params.id;
    Declaration.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:"cannot update user with id : "+id
                });
            }else res.send({message:"User updated successfully"});
        })
        .catch(err=>{
            res.status(500).send({
                message:"Error updatubg User with id : "+id
            });
        })
}
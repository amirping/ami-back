const config = require("../config/auth.config");
const db = require("../models");
const Actuality = db.actuality;
const nodemailer=require("../config/nodemailer.config");
const { actuality, notification } = require("../models");
const socket=require('socket.io');

exports.addActuality=(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const img=req.body.img;

    const newActuality= new Actuality({
        title,
        description,
        img,
    });
    newActuality.save()
        .then(()=>res.json("Actuality added succesfully"))
        .catch(err=>res.status(400).json('error : '+err));

};
exports.listActuality = (req,res)=>{
    Actuality.find()
        .then(actualities=>res.json(actualities))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.getActualityById = (req,res)=>{
    Actuality.findById(req.params.id)
        .then(actuality=>res.json(actuality))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.deleteActuality = (req,res)=>{
    Actuality.findByIdAndDelete(req.params.id)
        .then(()=>res.json('ACTUALITY DELETED'))
        .catch(err=>res.status(400).json('error : '+err));
};

exports.updateActuality = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"cannot be empty"
        });
    }
    const id=req.params.id;
    Actuality.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
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
const db =  require("../models");
const Reclamation = db.reclamation;
const nodemailer = require("../config/nodemailer.config");


exports.addReclamation=(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const etat=req.body.etat;
    const categorie=req.body.categorie;

    const newReclamation = new Reclamation({
        title,
        description,
        etat,
        categorie,
    });
    newReclamation.save()
        .then(()=>res.json("ReclamationAjouter"))
        .catch(err=>res.status(400).json('error : '+err));

};
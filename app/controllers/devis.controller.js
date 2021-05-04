const db = require("../models");
const Devis=db.devis;
const Garantie=db.garantie;
const DemandeDevis=db.demandedevis;
const DevisAutoMobile=db.devisautomobile;

//Supprimer devis automobile
exports.deleteDevisAutoMobile=(req,res)=>{
    DevisAutoMobile.findById(req.params.id,function(err,data){
        if(err){
            res.status(404).json('error');
        
        }
        else if(data){
            Garantie.findByIdAndDelete(data.garantie,(err,garantie)=>{
                if(err){
                    res.status(404).json('error');
                }
                else{
                    DevisAutoMobile.findByIdAndDelete(req.params.id)
                        .then(()=>res.json("Deleted"))
                        .catch(err=>res.status(404).json('error'));
                }
            })
        }else res.status(404).json('Not Found '+err );
    })

}



//Ajouter devis automobile
exports.addDevisAutoMobile=(req,res)=>{
    //garantie
    const libelle=req.body.libelle;
    const limit=req.body.limit;
    const unite=req.body.unite;
    //automobile
    const user=req.body.user;
    const gouvernerat=req.body.gouvernerat;
    const ville=req.body.ville;
    const agence=req.body.agence;
    const numMat=req.body.numMat;
    const marque=req.body.marque;
    const nbrC=req.body.nbrC;
    const nbrP=req.body.nbrP;
    const DateCir=req.body.DateCir;
    const valeurV=req.body.valeurV;
    const contrat=req.body.contrat;
    const garantie=req.body.garantie;

    const newGarantie=new Garantie({
        libelle,
        limit,
        unite,

    });
    const newDevisAutoMobile=new DevisAutoMobile({
        user,
        gouvernerat,
        ville,
        agence,
        numMat,
        marque,
        nbrC,
        nbrP,
        DateCir,
        valeurV,
        contrat,
        garantie:newGarantie._id
    });
    newDevisAutoMobile.save((err,newDevisAutoMobile)=>{
        if(err){
            res.status(500).json('error : '+err);
        }
        else{
            if(newDevisAutoMobile){
                const updatedGarantie= new Garantie({
                    _id:newGarantie.id,
                    libelle,
                    limit,
                    unite

                })
                updatedGarantie.save()
                    .then(()=>res.json("Devis added successfully"))
                    .catch(err=>res.status(400).json('error : '+err));
            }
        }
    });
}

//update devis automobile
exports.updateDevis=(req,res)=>{
    DevisAutoMobile.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send('cannot update devis with id : '+req.params.id)
            }else{res.send("Devis updated succesfully");}
        })
        .catch(err=>{res.status(500).send("error updating etape with id : "+req.params.id);})
}

//add another garantie
exports.addGarantieV1=(req,res)=>{
    DevisAutoMobile.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(404).send('cannot find Devis with id : '+req.params.id);
        }else{
            const newGaranties = new Garantie({
                libelle:req.body.libelle,
                limit:req.body.limit,
                unite:req.body.unite,
            });
            newGaranties.save((err,newGaranties)=>{
                if(err){
                    res.send('error : '+err);
                }
                else{
                    data.garantie.push(newGaranties._id);
                    data.save()
                        .then(()=>res.json('Updated'))
                        .catch(err=>res.status(400).json('error : '+err));
                }
            })
                
        }
    })
}

//delete garantie from devis
exports.deleteGarantieV1=(req,res)=>{
    DevisAutoMobile.findById(req.params.id,(err,data)=>{
        if(err){
            res.send('error : '+err);
        }else{
            Garantie.findById(data.garantie,(err,garantie)=>{
                if(err){
                    res.send('error : '+err);
                }
                else{
                    const idGarantie=garantie._id;
                    data.garantie.pop(garantie._id);
                    data.save()
                        .then(()=>res.json('saved'))
                        .catch(err=>res.status(400).json('error'));
                    Garantie.findByIdAndDelete(idGarantie)
                        .then(()=>res.json("Updated"))
                        .catch(err=>res.status(400).json('error :'+err));
                }
            })
        }
    })
}
//update Devis Habitation occupant

exports.updateDevisHabitation=(req,res)=>{
    DemandeDevis.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send('cannot update devis with id: '+req.params.id)
            }else{res.send("Devis updated successfully");}
        })
        .catch(err=>res.status(500).send("Error updating devis with id : "+req.params.id));
}

//add another garantie devis habitation
exports.addGarantieV2=(req,res)=>{
    DemandeDevis.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(404).send('cannot find devis with id : '+req.params.id);
        }else{
            const newGaranties = new Garantie({
                libelle:req.body.libelle,
                limit:req.body.limit,
                unite:req.body.unite,
            });
            newGaranties.save((err,newGaranties)=>{
                if(err){
                    res.send('error : '+err);
                }
                else{
                    data.garantie.push(newGaranties._id);
                    data.save()
                        .then(()=>res.json('Updated'))
                        .catch(err=>res.status(400).json('error : '+err));
                }
            })
        }
    })
}

//deletegarantie from devis habitation
exports.deleteGarantieV2=(req,res)=>{
    DemandeDevis.findById(req.params.id,(err,data)=>{
        if(err){
            res.send('error : '+err);
        }else{
            Garantie.findById(data.garantie,(err,garantie)=>{
                if(err){
                    res.send('error : '+err);
                }
                else{
                    const idGarantie=garantie._id;
                    data.garantie.pop(garantie._id);
                    data.save()
                        .then(()=>res.json('saved'))
                        .catch(err=>res.status(400).json('error'));
                    Garantie.findByIdAndDelete(idGarantie)
                        .then(()=>res.json("Updated"))
                        .catch(err=>res.status(400).json('error :'+err));
                }
            })
        }
    })
}
//Ajouter Devis Habitaion occupant
exports.addDevisHabitationOccupant=(req,res)=>{
    //garantie
    const libelle=req.body.libelle;
    const limit=req.body.limit;
    const unite=req.body.unite;
    //habitation occupant
    const user=req.body.user;
    const gouvernerat=req.body.gouvernerat;
    const ville=req.body.ville;
    const agence=req.body.agence;
    const homeType=req.body.homeType;
    const nbrCh=req.body.nbrCh;
    const valeurMobilier=req.body.valeurMobilier;
    // const garantie=req.body.garantie;

    const newGarantie=new Garantie({
        libelle,
        limit,
        unite,
    });

    const newDevisHabitationOccupant = new DemandeDevis({
        user,
        gouvernerat,
        ville,
        agence,
        homeType,
        nbrCh,
        valeurMobilier,
        garantie:newGarantie._id
    });
    newDevisHabitationOccupant.save((err,newDevisHabitationOccupant)=>{
        if(err){
            res.status(500).json('error : '+err);
        }
        else{
            if(newDevisHabitationOccupant){
               const updatedGarantie=new Garantie({
                   _id:newGarantie.id,
                   libelle,
                   limit,
                   unite
               });
               updatedGarantie.save()
                    .then(()=>res.json("Devis added successfully"))
                    .catch(err=>res.status(400).json('error : '+err));
            }
        }
    });
}

//supprimer devis habitation
exports.deleteDevisHabitationOccupant=(req,res)=>{
    DemandeDevis.findById(req.params.id,(err,data)=>{
        if(err){
            res.send('error : '+err);
        }
        else if(data){
            Garantie.findByIdAndDelete(data.garantie,(err,garantie)=>{
                if(err){
                    res.status(404).json('error');
                }
                else{
                    DemandeDevis.findByIdAndDelete(req.params.id)
                        .then(()=>res.json("Deleted"))
                        .catch(err=>res.status(404).json('error'));
                }
            })
        }else res.status(404).json('Not Found : '+err);   
    })
}

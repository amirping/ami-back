const db = require("../models");
const Ticket=db.reclamationticket;
const Etape=db.etape;
const Reclamation=db.reclamation;
const nodemailer=require("../config/nodemailer.config");
const { user, reclamation } = require("../models");
const Categorie=db.categories;
const User=db.user;
const Notification =db.notification;
const socket = require('../../server');
const { populate } = require("../models/user.model");
const ticketReclamation = require("../models/reclamationTicket.model");
const Categories = require("../models/categories.model");


exports.findCategories=(req,res)=>{
    Categorie.find()
        .then(categs=>res.json(categs))
        .catch(err=>res.status(400).json('error : '+err));
}

//find all tickets
exports.findTickets=(req,res)=>{
    Ticket.find()
        .then(tickets=>res.json(tickets))
        .catch(err=>res.status(400).json('error : '+err));
}


//find reclamation of the ticket by id
exports.findReclamation=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else{
            Reclamation.findById(data.reclamation)
                .then(reclamation=>res.json(reclamation))
                .catch(err=>res.status(400).json('error : '+err));
        }
    })
}


// find Etape of the ticket by id
exports.findEtape=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else
            Etape.findById(data.etape)
                .then(etape=>res.json(etape))
                .catch(err=>res.status(400).json('error : '+err));
        
    })
}

//find Etape with the id
exports.findEtapeById=(req,res)=>{
    Etape.findById(req.params.id)
        .then(data=>res.send(data))
        .catch(err=>res.status('404').send('error :'+err ));
}

//add Ticket and Etape and reclamation
exports.addTicketEtape=(req,res)=>{
    const etape=req.body.etape;
    const ticket=req.body.etape;
    const title=req.body.title;
    const description=req.body.description;
    const categorie=req.body.categorie;
    const newReclamation= new Reclamation({
        ticket,
        title,
        description,
        categorie,
    })

    const newEtape=new Etape({
        etape,    
    });
    
   
    const user=req.body.user;
    const code=req.body.code;
    // Ticket.count({},function(err,num){
    //     if(err){
    //         return console.log(err);
    //     }
    //     return code=num;
    // });
    Ticket.count({},function(err,num){
        if(err){
            return console.log(err);
        }
        const newTicket=new Ticket({
            // code:num+1,
            code: num+1+""+new Date().getFullYear(),
            user,
            etape:newEtape._id,
            reclamation:newReclamation._id
        }); 
   
        newTicket.save((err,newTicket)=>{
            if(err){
                res.status(500).json('error : '+err);
            }
            else{
                if(newTicket){
                    const newEtapes=new Etape({
                        _id:newEtape.id,
                        etape,
                        ticket:newTicket._id,
                        reclamation:newReclamation._id,
                    })
                    const newReclamations=new Reclamation({
                        _id:newReclamation._id,
                        ticket:newTicket._id,
                        title,
                        description,
                        categorie,
                        
                    })
    
                    
                    newReclamations.save()
                        .then(()=>res.json("Reclamation added succesfully"))
                        .catch(err=>res.status(400).json('error : '+err));
                    newEtapes.save()
                        .then(()=>socket.socket.emit('notification',newTicket),res.json(newTicket))
                        .catch(err=>res.status(400).json('error : '+err));
                   
                
                    }
            }
    
        });
   
    })
    // const newTicket=new Ticket({
    //     code,
    //     user,
    //     etape:newEtape._id,
    //     reclamation:newReclamation._id
    // });   

}
//find the user and send email
(id)=(req,res)=>{
    Ticket.findById(id,function(err,data){
        if(err){
            res.send('error : '+err);
        }
        else{
            User.findById(data.user,function(err,doc){
                if(err){
                    res.send('error'+err)
                }
                else{
                    nodemailer.sendReclamationEmail(
                        doc.username,
                        doc.email
                    )
                }
            })
        }
    })
}
//update reclamation after adding ticket
exports.updateReclamation=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else{
            Reclamation.findByIdAndUpdate(data.reclamation,req.body,{useFindAndModify:false})
                .then(doc=>{
                    if(!doc){
                        res.status(404).send("cannot update reclamation with id : "+data.reclamation)
                    }else{

                        Reclamation.findById(data.reclamation,(err,rec)=>{
                            if(err){
                                res.send("error : "+err);
                            }
                            else{
                                Categorie.findById(rec.categorie,(err,data2)=>{
                                    if(err){
                                        res.send("error : "+err);
                                    }
                                    else{
                                        User.findById(data.user)
                                            .then(user=>nodemailer.TestEmail(user.email,user.username,rec.updatedAt,data.code,rec.description,data2.name),console.log("check : "+user.email))
                                            .catch(err=>res.send("error : "+err));
                                    }
                                })
                                res.send("Reclamation updated successfully")
                                // socket.socket.emit('notification',data)
                            }
                        })
                                
                        // Categorie.findById(doc.categorie,(err,data2)=>{
                        //     if(err){
                        //         res.send("error : "+err);
                        //     }
                        //     else{
                          
                        //         User.findById(data.user)
                        //             .then(user=>nodemailer.TestEmail(user.email,user.username,doc.updatedAt,data.code,doc.description),console.log('check : '+user.email))
                        //             .catch(err=>console.log(err));

                        //     }
                            
                        // })
                        // res.send("Reclamation updated successfullyssqdsqdsq")
                        // socket.socket.emit('notification',data)
                }
                })
                .catch(err=>{
                    res.status(500).send("error updating reclamation with id : "+data.reclamation);
                })
               
        }
    } 
    );
}

//update Etape
exports.updateEtape=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else{
            Etape.findByIdAndUpdate(data.etape,req.body,{useFindAndModify:false})
                .then(doc=>{
                    if(!doc){
                        res.status(404).send('cannot update the step with id : '+data.etape)
                        
                    }else{res.send(doc)}
                })
                .catch(err=>{
                    res.status(500).send("error updating etape with id : "+data.etape);
                })
        }
    })
}

//update Ticket
exports.updateTicket=(req,res)=>{
    Ticket.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
        .then(doc=>{
            if(!doc){
                res.status(404).send('cannot update the Ticket with the id : '+req.params.id)

            }else{res.send("Ticket updated succesfully")}
        })
        .catch(err=>{
            res.status(500).send("error updating the ticket with the id : "+req.params.id);
        })
}

//update Reclamation
exports.updateReclamations=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else{
            Reclamation.findByIdAndUpdate(data.reclamation,req.body,{useFindAndModify:false})
                .then(doc=>{
                    if(!doc){
                        res.status(404).send('cannot update the reclamation with the id : '+data.reclamation);

                    }else{res.send("Reclamation updated succesfully")}
                })
                .catch(err=>{
                    res.status(500).send("error updating reclamation with id : "+data.reclamation);
                })
        }
    })
}

//delete Ticket Etape and reclamation
exports.deleteEtapeTick=(req,res)=>{
    Ticket.findById(req.params.id,function(err,data){
        if(err){
            res.send("error : "+err);
        }
        else{
            

            Etape.findByIdAndDelete(data.etape,function(err,etape){
                if(err){
                    res.send('error : '+err);
                }
                else{
                    Reclamation.findByIdAndDelete(data.reclamation,function(err,reclamation){
                        if(err){
                            res.send('error : '+err);
                        }
                        else{
                            Ticket.findByIdAndDelete(req.params.id)
                                .then(()=>res.json("DELETED"))
                                .catch(err=>res.status(400).json('error : '+err));
                        }
                    })
                    
                }
            });
        }
    });
}


exports.test3=(req,res)=>{
    const list=[]
    let i=0;
    Ticket.find().populate('reclamation',Reclamation)
        .populate('user',User)
        .populate('etape',Etape)
        .then(data=>{
            list.push(data);
           
            list.forEach(element => {
               
                    res.send(element);
                
            });
 
        })
        .catch(err=>console.log(err));
}

exports.getReclamationById=(req,res)=>{
    Reclamation.findById(req.params.id)
        .populate("ticket",ticketReclamation)
        .populate("categorie",Categories)
        .then(data=>res.json(data))
        .catch(err=>res.status(400).json('error : '+err));
}

exports.testcode=(req,res)=>{
    Ticket.find((err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("shit");
        }
    })
}





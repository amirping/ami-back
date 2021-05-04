const {authJwt}= require("../middlewares");
const controller=require("../controllers/devis.controller");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept" 
        );
        next();
    });
    //devis auto mobile
    app.delete("/api/test/deleteGarantie/:id",controller.deleteGarantieV1);
    app.post("/api/test/addGarantie/:id",controller.addGarantieV1);
    app.put("/api/test/updateDevisAutoMobile/:id",controller.updateDevis);
    app.delete("/api/test/deleteDevisAutoMobile/:id",controller.deleteDevisAutoMobile);
    app.post("/api/test/addDevisAutoMobile",controller.addDevisAutoMobile);
    //update garantie
    
    //devis habitation occupant
    app.post("/api/test/addDevisHabitationOccupant",controller.addDevisHabitationOccupant);
    app.delete("/api/test/deleteDevisHabitationOccupant/:id",controller.deleteDevisHabitationOccupant);
    app.delete("/api/test/deleteGarantieDevis/:id",controller.deleteGarantieV2);
    app.post("/api/test/addGarantieDevis/:id",controller.addGarantieV2);
    app.put("/api/test/updateDevisHabitation/:id",controller.updateDevisHabitation);
    //update garantie
}
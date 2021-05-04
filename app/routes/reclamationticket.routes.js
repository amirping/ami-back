const {authJwt}= require("../middlewares");
const controller = require("../controllers/reclamationTicket.controller");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/getReclamationById/:id",controller.getReclamationById);
    app.get("/api/test/categories",controller.findCategories);
    app.get("/api/test/test2/:id",controller.test3);
    app.get("/api/test/Tickets",controller.findTickets);
    app.get("/api/test/findEtape/:id",controller.findEtape);
    app.post("/api/test/addTicketReclamation",controller.addTicketEtape);
    app.put("/api/test/updateTicket/:id",controller.updateTicket);
    app.put("/api/test/updateReclamation/:id",controller.updateReclamation);
    app.delete("/api/test/deleteTicketEtape/:id",controller.deleteEtapeTick);
    app.put("/api/test/updateEtape/:id",controller.updateEtape);
    app.put("/api/test/updateTicket/:id",controller.updateTicket);
    app.get("/api/test/test3",controller.test3);
    app.get("/api/test/findReclamation/:id",controller.findReclamation);
    app.get("/api/test/testcode",controller.testcode);
}
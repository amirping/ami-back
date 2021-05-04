const {authJwt}= require("../middlewares");
const controller = require("../controllers/actuality.controller");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept" 
        );
        next();
    });
    app.post("/api/test/addActuality",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addActuality);

    app.get("/api/test/listActuality",
    controller.listActuality);

    app.put("/api/test/updateActuality/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.updateActuality);

    app.delete("/api/test/deleteActuality/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteActuality);

   app.get("/api/test/getActualityById/:id",controller.getActualityById);
}
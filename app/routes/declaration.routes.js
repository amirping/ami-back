const {authJwt}= require("../middlewares");
const controller = require("../controllers/declaration.controller");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept" 
        );
        next();
    });
    app.post("/api/test/addDeclaration",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addDeclaration);

    app.get("/api/test/listDeclaration",
    controller.listDeclaration);

    app.put("/api/test/updateDeclaration/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.updateDeclaration);

    app.delete("/api/test/deleteDeclaration/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteDeclaration);

   app.get("/api/test/getDeclarationById/:id",controller.getDeclarationById);
}
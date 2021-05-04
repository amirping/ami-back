const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );
  app.get("api/test/user",
    [authJwt.verifyToken,authJwt.isUser],
    controller.userBoard),
app.get("api/test/findRolesById/:id",controller.getRoleById);
  
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/test/list",
  [authJwt.verifyToken,authJwt.isAdmin]
  , controller.findAll);
  app.get("/api/test/findUserById/:id",controller.findUserByid);

  app.delete("/api/test/deleteUser/:id",controller.DeleteUser);


  app.put("/api/test/updateUser/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateUser);
};


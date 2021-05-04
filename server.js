const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Categories=db.categories;
const actuality=db.actuality;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to home." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/actuality.routes")(app);
require("./app/routes/reclamationticket.routes")(app);
require("./app/routes/devis.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.post('/send-notifications',cors(),(req,res,next)=>{
  const notify={data:req.body}
  actuality.find(function(err,data){
    if(err){
      res.send('error' +err);
    }
    else{socket.emit('notification',data);}
  })
  // socket.emit('notification',data);
  res.send(notify);
})

  exports.socket=require('socket.io')(server,{
  cors:{
    origin:'http://localhost:4200',
    methods:["GET","POST","PUT","DELETE"]
  }
});
// socket.on('connection',socket=>{
//   console.log('socket:client connected');
// });


function initial() {
  //Categories
  Categories.estimatedDocumentCount((err,count)=>{
    if(!err &&count ===0){
      new Categories({
        name:"Information generale"
      }).save(err=>{
        if(err){
          console.log("Error",err);
        }
        console.log("added 'Information generale' to categories collection ");
      });

      new Categories({
        name:"Suivi de dossier"
      }).save(err=>{
        if(err){
          console.log("Error",err);
        }
        console.log("added 'Suivi de dossier' to categories collection ")
      });

      new Categories({
        name:"Résiliation de contrat"
      }).save(err=>{
        if(err){
          console.log("Error",err);
        }
        console.log("added 'Résiliation de contrat' to categories collection ")
      });
      new Categories({
        name:"Renouvellement assurance"
      }).save(err=>{
        if(err){
          console.log("Error",err);
        }
        console.log("added 'Renouvellement assurance' to categories collection");
      });
    }
  });





  //Roles
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

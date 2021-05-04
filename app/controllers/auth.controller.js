const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const nodemailer=require("../config/nodemailer.config");
const Role = db.role;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const token=jwt.sign({email:req.body.email},config.secret);

  const user = new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    numtel:req.body.numtel,
    
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:req.body.role,
    activite:req.body.activite,
    numid:req.body.numid,
    img:req.body.img,
    confirmationCode:token,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!Please Check your Email" ,});
            nodemailer.sendConfirmationEmail(
              user.username,
              user.email,
              user.confirmationCode
            );
              // res.redirect("/");
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!Please Check your Email" });
        });
        nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          user.confirmationCode
        );
        
      });
    }
  });
};


exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: "please " });
        return;
      }
    // if(res!=null){
    //   if(!res.username){
    //     res.status(401).send({message:"User Not Found"});
    //   }
    //   else{
    //     res.status(500).send({message:""})
    //   }
    // }
    //bug
      // if(user.status!="Active"){
      //   return res.status(401).send({message:"Pending Account . Please Verify Your Email"});
      // }
    

      // if (!user) {
      //   return res.status(404).send({ message: "User Not found." });
     
      // }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
     
      }

      else{if(user.status!="Active"){
        return res.status(401).send({message:"Pending Account . Please Verify Your Email"});
      }}
     
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
   

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        numtel:user.numtel,
        username: user.username,
        email: user.email,
        role:user.role,
        activite:user.activite,
        numid:user.numid,
        img:user.img,
        roles: authorities,
        accessToken: token,
        status:user.status,
        createdAt:user.timestamps,
      });
    });
};

exports.verifyUser = (req, res) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};
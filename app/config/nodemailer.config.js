const nodemailer=require("nodemailer");
const config=require("../config/auth.config");

const user=config.user;
const pass=config.pass;

const transport = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:user,
        pass:pass,
    },
});

module.exports.sendConfirmationEmail = (name,email,confirmationCode)=>{
    console.log("Check");
    transport.sendMail({
        from:user,
        to:email,
        subject:"Please Confirm your email",
        html:`<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signin in .Please confirm your email By Clicking the following Link</p>
        <a href=http://localhost:8080/api/auth/confirm/${confirmationCode}>Click Here</a>
        </div>`
    }).catch(err=>console.log(err));
}

module.exports.sendReclamationEmail=(name,email,updatedAt,code,descrption,categorie)=>{
    transport.sendMail({
        from:user,
        to:email,
        subject:`Reclamation : ${categorie}`,
        html:`<h1>Hello ${name}<h1>
        <p>your reclamation of code ${code} has been received on ${updatedAt}<br>
        and it contains the following:<br>${descrption}
        
        <p>
        </div>`
    }).catch(err=>console.log(err));
}

module.exports.TestEmail=(email,name,updatedAt,code,description,categorie)=>{
    transport.sendMail({
        from:user,
        to:email,
        subject:`${categorie}`,
        html:`<h1>Hello ${name}</h1>
        <p>your reclamation of code ${code} has been received on ${updatedAt}<br>
        and it contains the following : <br>
        ${description}`
    }).catch(err=>console.log(err));
}
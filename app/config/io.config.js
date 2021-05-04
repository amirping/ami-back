// var io =require('socket.io')();

// io.on('connection',function(socket){
//     console.log("socket established with id : "+socket.id);
//     socket.on('disconnect',function(){
//         console.log("socket disconnected : "+socket.id);
//     });
// });
const express=require('express');
const server=require('../../server')
const app=express();
exports.socket = require('socket.io')(server.server,{
    cors:{
        origin:'http://localhost:4200',
        method:['GET','POST','PUT','DELETE'],
    }
});







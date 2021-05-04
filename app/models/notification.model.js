const mongoose = require("mongoose");

const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        action:String,
        room:String,
        message:String
    },{timestamps:true})
)
module.exports = Notification;
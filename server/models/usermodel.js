const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
},{collection:'User-Data'})

module.exports = mongoose.model('user',user)
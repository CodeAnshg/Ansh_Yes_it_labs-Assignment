const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true,
        minlength : 3,
        maxlength : 100,
    },
    email :{
        type:String,
        required : true,
        trim : true,
    },
    password :{
        type:String,
        required: true,
        trim: true

    }
})

const userModal = mongoose.model("user",userSchema);

module.exports =  userModal;
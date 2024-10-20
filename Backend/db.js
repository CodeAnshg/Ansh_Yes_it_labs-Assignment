const mongoose = require('mongoose');

require("dotenv").config();

const mongoUrl = process.env.MONGO_CONN;

mongoose.connect(mongoUrl)
.then(()=>{
    console.log("mongodb Connected...")
})
.catch(()=>{
    console.log("mongodb connection error :" ,err);
})
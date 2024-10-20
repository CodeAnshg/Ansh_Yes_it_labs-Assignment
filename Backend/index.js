const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');

require("./db");
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());




const userRoutes = require("./routes/usersRoutes")

app.get('/',(req,res)=>{
    res.send("hello world")
});

app.use('/api',userRoutes);

app.listen(port , ()=>{
    console.log(`connected on port ${port}`)
})


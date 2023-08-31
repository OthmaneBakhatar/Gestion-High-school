const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/module_api");
const matiereroutes = require("./routes/matiere_api");
const epreuveroutes = require("./routes/epreuve_api.js");
mongoose.set('strictQuery', true); 
mongoose.connect('mongodb://127.0.0.1:27017/RestApi', { 
  userNewUrlParser: true, 
  userUnifiedTopology: true
})
  .then(() => console.log('Connected!'))
.catch((e)=>console.error('failed !' + e ));
// set up express app

const app = express();   
app.use(express.json());  


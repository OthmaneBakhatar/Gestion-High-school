const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UsereSchema = new Schema({
  

  username:{
    type:String,
  
 
  },
  password:{
    type:String
  }

 
});

const User = mongoose.model("User", UsereSchema); 


module.exports = User;
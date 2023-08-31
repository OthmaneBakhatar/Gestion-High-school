const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NotemodulesSchema = new Schema({
  classe:{
    type:mongoose.Schema.Types.ObjectId,ref:"Classe",
    required: [true, "Code de la classe est obligatoire"]
  },
  module:{
    type:mongoose.Schema.Types.ObjectId,ref:"Module",
    required: [true, "Code du module est obligatoire"]
  },
  
 
});

const ResultatsModule = mongoose.model("ResultatsModule", NotemodulesSchema);

module.exports = ResultatsModule;
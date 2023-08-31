const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ResultatsclassesSchema = new Schema({
  classe:{
    type:mongoose.Schema.Types.ObjectId,ref:"Classe",
    required: [true, "Code de la classe est obligatoire"]
  },
  AnneeScolaire:{
    type:String
  },
  MoyClasse:{
    type:mongoose.Types.Decimal128
  },
  NbrRatt:{
    type:Number
  },
  NbrRedoublant:{
    type:Number
  }
 
});

const Resultatsclasse = mongoose.model("Resultatsclasse", ResultatsclassesSchema);

module.exports = Resultatsclasse;
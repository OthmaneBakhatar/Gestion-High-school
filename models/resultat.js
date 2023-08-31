const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Resultatschema = new Schema({
  Code_Et:{
    type:mongoose.Schema.Types.ObjectId,ref:"Etudiant",
    required: [true, "Code de la classe est obligatoire"]
  },
  moyenne:
  {
    type:mongoose.Types.Decimal128,
  }
  

 
});

const Resultats = mongoose.model("Resultats", Resultatschema);

module.exports = Resultats;
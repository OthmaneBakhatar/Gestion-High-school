const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ObtenirmoduleSchema = new Schema({
  etudiant:{
    type:mongoose.Schema.Types.ObjectId,ref:"etudiant",
    required: [true, "Code de l'epreuve est obligatoire"]
  },
  module:{
    type:mongoose.Schema.Types.ObjectId,ref:"module",
    required: [true, "Code du module est obligatoire"]
  },
  NoteModule:{
    type:mongoose.Types.Decimal128,
  }
 
});

const Obtenirmodule = mongoose.model("Obtenirmodule", ObtenirmoduleSchema); 


// 
const obmatiere=new Obtenirmodule({ 


  etudiant:'642ac72d9822fe152516c0d5', 
  module:'6426f1981c7fcb074ba8e387', 
  NoteModule:17
});   

// obmatiere.save();

module.exports = Obtenirmodule;
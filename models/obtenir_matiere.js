const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Obtenir_module = require('../models/obtenir_module');

const ObtenirmatiereSchema =   new Schema({
  etudiant:{
    type:mongoose.Schema.Types.ObjectId,ref:"Etudiant",
    required: [true, "Code de l'epreuve est obligatoire"]
  },
  matiere:{
    type:mongoose.Schema.Types.ObjectId,ref:"Matiere",
    required: [true, "Code de matiere est obligatoire"]
  },
  NoteMatiere:{
    type:mongoose.Types.Decimal128,
  }
 
});

const Obtenirmatiere = mongoose.model("Obtenirmatiere", ObtenirmatiereSchema); 


// 
const obmatiere=new Obtenirmatiere({ 


  etudiant:'642d5fed68319764add9c9dd', 
  matiere:'642d7d449993f3e777a8d84a', 
  NoteMatiere:15
}); 
  //  obmatiere.save();
// 
module.exports = Obtenirmatiere;
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const Note= require("../models/note"); 
const Obtenirmatiere=require("../models/obtenir_matiere");    
const Obtenirmodule =require("../models/obtenir_module"); 
const {ObjectId}=mongoose.Schema;
// Create Schema model

const EpreuveSchema = new Schema({
  NomEpreuve: {
    type: String,
    required: [true, "Code du Module est obligatoire"],
    
  },
  DateEpreuve: {
    type: String,
    FormData:"date",
    match:/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    
  },
  HeureEpreuve: {
    type: String,
    FormData:"time"
    
  },
  LieuEpreuve: {
    type: String,
    maxLength:5,
    minLength:2,
    
  },
  NatureEpreuve: {
    type:String,
    maxLength:10,
    
    
  },
  Code_mat:{
    type:ObjectId,
    ref : "Matiere",
    required: [true, "Code de la matiere est obligatoire"]
  } 

});
EpreuveSchema.pre('remove', async function(next) {
  const epreuve = this;
   try {
     const notes = await Note.deleteMany({ Code_E: epreuve._id });
     console.log(`Supprimé ${notes.deletedCount} notes pour l'épreuve ${this._id}`); 
     
     next();
   
   } catch (err) {
     next(err);
   }
   
    next(err);
 });
const Epreuve = mongoose.model("Epreuve", EpreuveSchema); 
const Epreuve1=new Epreuve ({  
  NomEpreuve: 'epr_php2', 
  DateEpreuve: '2023-09-22', 
  HeureEpreuve : '16:00', 
  LieuEpreuve : 'ESTC', 
  NatureEpreuve : 12, 
  // Code_mat: '642cbefa94233bf1c2dd27b4',
});
//  Epreuve1.save();
module.exports = Epreuve;
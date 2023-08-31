const mongoose = require("mongoose");
const Note= require("../models/note"); 
const Obtenirmatiere=require("../models/obtenir_matiere");    
const Obtenirmodule =require("../models/obtenir_module");  
const Schema = mongoose.Schema; 


// Create Schema model

const EtudiantSchema = new Schema({
  CNE: {
    type:String,
    maxLength:10, 
    minLenght:10,
    match: /^[A-Z]{1}[0-9]{9}$/,
    unique:true,
    required: [true, "CNE est obligatoire"],
    
  },
  Nom: {
    type: String,
    maxLength: 15,
    required: [true, "Nom est obligatoire"],
  },
  Prenom: {
    type: String,
    maxLength: 15,
    required: [true, "Nom est obligatoire"],
  },
  Date_N: {
    type:Date,
    match:/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
     required: [true, "Date est obligatoire"],
  },
  Type_Bac :{
    type : String,
    maxLength:10, 
    // required: [true, "typeBac est obligatoire"],
  },
  Mention_Bac :{
    type:String,
    maxLength:20, 
    //  required: [true, "Mention est obligatoire"],
  },
  Academie :{
    type:String,
    maxLength:35
  },
  Lycee :{
    type:String,
    maxLength:30
  },
  adresse:{
    type:String,
    maxLength:50, 
    //  required: [true, "adresse est obligatoire"],
  },
  
  Code_C :{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Classes",
     
  }, 
  Email:{
    type:String,
    maxLength:50,  
    unique:true,
    //  required: [true, "email est obligatoire"],
  },
  Tele:{
    type:Number, 
    maxLength:10,  
    minLenght:10,
   
  }
  
  
}); 
EtudiantSchema.pre('remove', async function(next) {
 const etudiant = this;
  try {
    const notes = await Note.deleteMany({ Code_Et: etudiant._id });
    console.log(`Supprimé ${notes.deletedCount} notes pour l'étudiant ${this._id}`); 
    const obmatiere = await Obtenirmatiere.deleteMany({ Code_Et: etudiant._id }); 
    console.log(`Supprimé ${obmatiere.deletedCount} notes pour l'étudiant ${this._id}`);   
    const obmodule = await Obtenirmodule.deleteMany({ Code_Et: etudiant._id }); 
    console.log(`Supprimé ${obmodule.deletedCount} notes pour l'étudiant ${this._id}`);  
    next();
  
  } catch (err) {
    next(err);
  }
   console.log('rrrr'); 
   next(err);
});


const Etudiant = mongoose.model("Etudiant", EtudiantSchema);
const etud1=new Etudiant ({ 
  CNE : 'R010111391', 
  Nom : 'leila', 
  Prenom : 'benassim', 
  Date_N:"2002-01-22", 
  Type_Bac:'pc',  
  Mention_Bac :'Bien', 
  Code_C : '642df9b05894804c7ee8889f',
  adresse:'boournousi', 
 Academie: 'ben msik', 
  Lycee : 'Hassan 2', 
  // Code_C : 6192345123, 
  Email : 'leilaaa2345@gmail.com' ,
  Tele : 06345,

})
            //  etud1.save();

module.exports = Etudiant; 

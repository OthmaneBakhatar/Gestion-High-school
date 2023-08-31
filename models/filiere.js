const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Note= require("../models/note"); 
const Obtenirmatiere=require("../models/obtenir_matiere");    
const Obtenirmodule =require("../models/obtenir_module");    
const Classes = require("../models/classes");  
const Epreuve = require("../models/epreuve"); 
const Matiere = require("../models/matiere");  
const Module = require("../models/module"); 
const Etudiant = require("./etudiant");

const FiliereSchema = new Schema({

  Nom_F:{
    type:String, 
    maxLength:30, 
    required: [true, "le nom est obligatoire"], 
    unique : true,
    // match:/[a-zA-Z]/
  } ,

  desc:{ 
    type:String, 
    
   
  } 
 
}); 
 




FiliereSchema.pre('remove', async function(next) { 
  try { 
var filiere = this;    
const classess=await Classes.find({ Code_F: filiere._id });   
for (classee of classess) 
{ 
  const tr_class=await Module.find({ Code_C: classee._id });  
  for (modulee of tr_class) 
  { 
   const matieres = await Matiere.find({ Code_M: modulee._id });
  for (matiere of matieres) 
  { 
   const epreuves = await Epreuve.find({ Code_mat: matiere._id });
   for (let i = 0; i < epreuves.length; i++) {
     const epreuve = epreuves[i];
     await Note.deleteMany({ Code_E: epreuve._id }); 
  
   } 
   await Epreuve.deleteMany({ Code_mat: matiere._id });  
   await Obtenirmatiere.deleteMany({ matiere: matiere._id }); 
   
  } await Matiere.deleteMany({ Code_M: modulee._id });   
   
  await Obtenirmodule.deleteMany({ module: modulee._id });  
   }  
   
   
  await Module.deleteMany({ Code_C: classee._id }); 
  
   const et_class=await Etudiant.find({ Code_C: classee._id });  
   for (etudiant of et_class) 
   { 
    const notes = await Note.deleteMany({ Code_Et: etudiant._id });
    console.log(`Supprimé ${notes.deletedCount} notes pour l'étudiant ${etudiant._id}`); 
    const obmatiere = await Obtenirmatiere.deleteMany({ Code_Et: etudiant._id }); 
    console.log(`Supprimé ${obmatiere.deletedCount} notes pour l'étudiant ${etudiant._id}`);   
    const obmodule = await Obtenirmodule.deleteMany({ Code_Et: etudiant._id }); 
    console.log(`Supprimé ${obmodule.deletedCount} notes pour l'étudiant ${etudiant._id}`);  
   }
  
   await Etudiant.deleteMany({ Code_C: classee._id }); 
}

await Classes.deleteMany({ Code_F: filiere._id }); 
   next();
 } catch (err) {
   next(err);
 }
});

const Filiere = mongoose.model("Filiere", FiliereSchema); 

const fil1=new Filiere ({ 
   Nom_F :'genie mecanique ', 

   desc :'filiere pour les etudes des science mec',
   
  
  })
    // fil1.save();
module.exports = Filiere; 

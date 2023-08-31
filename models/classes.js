const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Note= require("../models/note"); 
const Obtenirmatiere=require("../models/obtenir_matiere");    
const Obtenirmodule =require("../models/obtenir_module");   
const Epreuve = require("../models/epreuve"); 
const Matiere = require("../models/matiere");  
const Module = require("../models/module"); 
const Etudiant = require("./etudiant");

const {ObjectId}=mongoose.Schema;



const ClasseSchema = new Schema({

    Nom_C:{
        type:String, 
       
        maxLength:3, 
        unique : true,
         required: [true, "le nom est obligatoire"],
        
      },
  Code_F:{
    type:mongoose.Schema.Types.ObjectId,  
    ref:"Filiere",
  }, 
 

 
});



ClasseSchema.pre('remove', async function(next) { 
  try { 
var classee = this; 
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
   next();
 } catch (err) {
   next(err);
 }
});
const Classes = mongoose.model("Classes", ClasseSchema); 

const classe1=new Classes ({ 
   
   Nom_C :'GM3', 
  Code_F:'63f92703865b417ce328207a',
 
   
  })
      //  classe1.save();

module.exports = Classes;
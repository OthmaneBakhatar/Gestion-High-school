const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const Epreuve = require("../models/epreuve"); 
const Note = require('../models/note'); 
const Matiere = require("../models/matiere"); 
const Obtenir_module = require('../models/obtenir_module'); 

const {ObjectId}=mongoose.Schema;


// Create Schema model

const ModuleSchema = new Schema({
 
  LibelleModule: {
    type: String,
    maxLength: 50,
    
  },
 
  coefficient:{
    type:mongoose.Types.Decimal128
  } ,
  Code_C : {  
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Classes",

  },  
  Code_S : {  
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Semestre",

  }

  
});


ModuleSchema.pre('remove', async function(next) { 
   try {
  const matieres = await Matiere.find({ Code_M: this._id });
for (matiere of matieres) 
{ 
  const epreuves = await Epreuve.find({ Code_mat: matiere._id });
  for (let i = 0; i < epreuves.length; i++) {
    const epreuve = epreuves[i];
    await Note.deleteMany({ Code_E: epreuve._id });
  } 
  await Epreuve.deleteMany({ Code_mat: matiere._id });
} 


await Matiere.deleteMany({ Code_M: this._id });  

await Obtenir_module.deleteMany({ module: this._id }); 

    next();
  } catch (err) {
    next(err);
  }
});

const Module = mongoose.model("Module", ModuleSchema); 

const modul1=new Module ({ 
  LibelleModule : 'module_GL344', 
  
  coefficient : 10, 
  Code_C :'63f92810a63b61fd76fa6705', 
  Code_S:'63f9e0a66c6a97dc044c0c6e',  
  

})
    //  modul1.save();

module.exports = Module;
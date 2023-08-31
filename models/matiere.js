const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const Epreuve = require("../models/epreuve"); 
const Note = require('../models/note');
const {ObjectId}=mongoose.Schema;

const MatiereSchema = new Schema({
  Code_M : {  
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Module",

  },  
  LibelleMatiere: {
    type: String,
    maxLength: 50, 
    unique:true, 
    
    
  },
  VH_CM: {
    type:mongoose.Types.Decimal128,
    maxLength:5,
    minLength:2,
    
  },
  VH_TD: {
    type: mongoose.Types.Decimal128,
    maxLength:5,
    minLength:2,
    
  },
  VH_TP: {
    type: mongoose.Types.Decimal128,
    maxLength:5,
    minLength:2,
    
  },
 
  coefficient:{
    type:mongoose.Types.Decimal128
  }
}); 



MatiereSchema.pre('remove', async function(next) {
  const matiere = this;
  try {
    // Delete related Epreuve documents
    const epreuves = await Epreuve.find({ Code_mat: matiere._id });
    for (let i = 0; i < epreuves.length; i++) {
      const epreuve = epreuves[i];
      await Note.deleteMany({ Code_E: epreuve._id });
    }
    await Epreuve.deleteMany({ Code_mat: matiere._id });

    // Delete related Note documents
 

    next();
  } catch (err) {
    next(err);
  }
});

const Matiere = mongoose.model("Matiere", MatiereSchema); 

const mat1=new Matiere ({ 
  LibelleMatiere : 'java',  
  Code_M:'642859f72bcd18894ea13710',
  VH_CM: 12,  
  VH_TD: 12, 
  VH_TP: 12,  
  coefficient : 10
 
   
  

})
      //  mat1.save();


module.exports = Matiere;
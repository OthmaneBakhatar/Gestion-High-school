const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ResultatSchema = new Schema({

 Code_Et:{
    type:mongoose.Schema.Types.ObjectId,ref:"Etudiant",
    required: [true, "Code de l'epreuve est obligatoire"]
  },
  AnneeScolaire:{
    type:String,
  },
  MoyS1:{
    type: mongoose.Types.Decimal128
  },
  MoyS2:{
    type: mongoose.Types.Decimal128
  },
  MoyGeneral:{
    type: mongoose.Types.Decimal128,
    default: function() {
      return ((this.MoyS1 + this.MoyS2)/2)
    } , 

    
  }  ,


  resultat:{
    type: String,
    default: function() { 
      if (this.MoyGeneral>=12) 
      { 
        return ("reusie")
      } else { 
        return ("redouble")
      }
  
    } , 

    
  } 
  


 
});

const Resultat = mongoose.model("Resultat", ResultatSchema); 

const resultat1=new Resultat ({ 
   
  
 
Code_Et : "63f79665a4db028b0d4d5bae",  
  AnneeScolaire:"2003",
  Moy_S1 : 16.4, 
  Moy_S2 : 16.8, 
 
  
 })
//  resultat1.save();

// module.exports = Resultat;
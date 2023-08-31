const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId}=mongoose.Schema;

// Create Schema model

const NoteSchema = new Schema({

 Code_E:{
    type:ObjectId,
    ref : "Epreuve",
    required: [true, "Code de l'epreuve est obligatoire"]
  } , 

  Code_Et:{
    type:mongoose.Schema.Types.ObjectId,ref:"Etudiant",
    required: [true, "Code de l'epreuve est obligatoire"]
  },

  Note:{
    type:mongoose.Types.Decimal128,
    maxLength:5,
    minLength:2
  }
}); 



// NoteSchema.pre('remove', function(next) {
//   // log before remove
// console.log ("supprimer avec succes ");
//   next();
// });

const Note = mongoose.model("Note", NoteSchema); 

// 
const Note1=new Note({ 


  Code_E:'642cb5a21cb8e35fdd097200', 
  Code_Et:'642be08839be510598cfeba7', 
  Note:18
}); 
        //  Note1.save();


module.exports = Note;
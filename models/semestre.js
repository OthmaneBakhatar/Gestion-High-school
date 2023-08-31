const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SemestresSchema = new Schema({
  

  Libelle:{
    type:String,
    // required: [true, "le nom est obligatoire"],
 
  },
  Periode:{
    type:Number
  }

 
});

const Semestre = mongoose.model("Semestre", SemestresSchema); 
const sem=new Semestre ({ 

Libelle :'semestre1', 
Periode :3

}); 
// sem.save();

module.exports = Semestre;
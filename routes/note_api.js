
const express=require("express");
const Note = require("../models/note"); 
const Etudiant = require("../models/etudiant");
const Filiere = require("../models/filiere");
const Classes = require("../models/classes");  
const Matiere = require("../models/matiere"); 
const Epreuve = require('../models/epreuve');
const router = express.Router();

// models


// get a list of notees from the database

router.get("/", (req, res, next) => {
  Note.find()
  .populate({
    path: 'Code_E',
    populate: {
      path: 'Code_mat',
      model: 'Matiere',
      select: 'LibelleMatiere'
    }
  })
  .populate({
    path: 'Code_Et',
    populate: {
      path: 'Code_C',
      model: 'Classes',
      select: 'Nom_C', 
      populate :{ 
        path:'Code_F', 
        model :'Filiere', 
        select :'Nom_F'
      }
    }
  })
  .select('Code_E Code_Et Note')
  .exec(function(err, notes) {
    if (err) {
      console.log(err);
    } else {
    res.send (notes);
    }
  });
});
// add a new user to the database  



router.get("/:id", (req, res, next) => {  
  
  Note.find({_id:req.params.id})
  .populate({
    path: 'Code_E',
    populate: {
      path: 'Code_mat',
      model: 'Matiere',
      select: 'LibelleMatiere'
    }
  })
  .populate({
    path: 'Code_Et',
    populate: {
      path: 'Code_C',
      model: 'Classes',
      select: 'Nom_C', 
      populate :{ 
        path:'Code_F', 
        model :'Filiere', 
        select :'Nom_F'
      }
    }
  })
  .select('Code_E Code_Et Note')
  .exec(function(err, notes) {
    if (err) {
      console.log(err);
    } else {
    res.send (notes);
    }
  });
});
router.get('/nom/:CNE', async (req, res, next) => {
  try {
   
    
    const notes = await Note.find({}).populate('Code_E').populate('Code_Et');
    
    if (!notes ) {
      return res.status(404).json({
        success: false,
        message: 'No notes found for the provided Nom'
      });
    }  
    const result=[]; 
   
    for (const note of notes) { 
if (note.Code_Et.CNE==req.params.CNE) 
{ 
result.push(note);
}

    }
    
   res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
 


router.get('/epreuve/:NOM', async (req, res, next) => {
  try {
   
    
    const notes = await Note.find({}).populate('Code_E').populate('Code_Et');
    
    if (!notes ) {
      return res.status(404).json({
        success: false,
        message: 'No notes found for the provided Nom'
      });
    }  
    const result=[]; 
   
    for (const note of notes) { 
if (note.Code_E.NomEpreuve==req.params.NOM) 
{ 
result.push(note);
}

    }
    
   res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { Code_E, Code_Et } = req.body; 
   

    // Retrieve Epreuve object by name
    const epreuve = await Epreuve.findOne({ NomEpreuve: Code_E });

    // Retrieve Etudiant object by code
    const etudiant = await Etudiant.findOne({ CNE: Code_Et });

    // Create new Note object
    const note = new Note({
      Code_E: epreuve._id,
      Code_Et: etudiant._id,
      Note:req.body.Note
    });

    // Save Note object to database
    await note.save();

    res.send(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// update a user to the database
router.put("/:id", async(req, res) => { 
  const { Code_E, Code_Et } = req.body; 
  const epreuve = await Epreuve.findOne({ NomEpreuve: Code_E }); 
  if (!epreuve)
{ 
  res.status(500).send("l'epreuve n'existe pas");
} 

  // Retrieve Etudiant object by code
  const etudiant = await Etudiant.findOne({ CNE:Code_Et }); 
  if (!etudiant) 
  { 
    res.status(500).send("l'etudiant n'existe pas");
  }  
  nev_data = { 
    Code_Et : etudiant._id, 
    Code_E :epreuve._id, 
    Note :req.body.Note
  }
  Note.findOneAndUpdate({ _id: req.params.id },  nev_data).then(() => {
    Note.findOne({ _id: req.params.id }).then((note) => {
      res.send(note);
    });
  });
});

// delete a user from database
router.delete("/:id", (req, res, next) => {
  Note.findByIdAndDelete({ _id: req.params.id }).then((note) => {
    res.send("note supprimée avec succès");
  });
});




module.exports=router;
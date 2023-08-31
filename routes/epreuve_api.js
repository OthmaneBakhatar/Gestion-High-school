const express = require("express");
const Epreuve = require("../models/epreuve");  
 const Classe = require("../models/classes");   
 const Module = require("../models/module");  
 const Filiere = require("../models/filiere"); 
const Matiere = require("../models/matiere"); 
const Etudient = require("../models/etudiant"); 
const Obtenir_matiere = require("../models/obtenir_matiere"); 
const Resultat_classe = require("../models/resultat_classe"); 
const Obtenir_module = require("../models/obtenir_module"); 
const Note = require("../models/note"); 
const Semestre = require("../models/semestre"); 
const Resultat_module = require("../models/resultat_module"); 
const Resultat_general = require("../models/resultat_general");
const router = express.Router(); 
const mongoose =require ('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
// models
module.exports = router;


router.get("/all", (req, res, next) => {
  //  if (!ObjectId.isValid(req.params.name)) {
  //     return res.status(400).json({ message: 'ID invalide' });
  //  }
   
   Epreuve.find()
   .populate( {path: 'Code_mat',model: 'Matiere'} )
   .exec((err, epreuve) => {
      if (err) {
         return res.status(500).json({ message: err.message });
      }
      // if (!epreuve) {
      //    return res.status(404).json({ message: 'Epreuve non trouvée' });
      // }
      res.json(epreuve );
   });
});

// router.get("/:name", (req, res, next) => {
//   Epreuve.findOne({NomEpreuve: req.params.name})
//   .then((epreuve) => {
//      if (!epreuve) {
//         return res.status(404).json({ message: "Epreuve introuvable" });
//      }
//      Matiere.findOne({CodeMatiere: epreuve.code_mat})
//      .then((matiere) => {  
//         if (!matiere) {
//            return res.status(404).json({ message: "Matière introuvable" });
//         }
//         const result = { epreuve, matiere }; 
//         res.send(result);
//      })
//      .catch((error) => {
//         console.log(error);
//         res.status(500).json({ message: "Erreur serveur" });
//      });
//   })
//   .catch((error) => {
//      console.log(error);
//      res.status(500).json({ message: "Erreur serveur" });
//   });
// });
// // add a new user to the database

router.post('/', async (req, res) => {
  try { 
    // console.log(req.body);
    // Retrieve the id of the module using its name
    const matiere = await Matiere.findOne({ LibelleMatiere: req.body.LibelleMatiere });
    if (!matiere) {
      return res.status(400).json({ message: "Matiere not found" });
    }

    // Convert the module id to an ObjectId
    const matiereId = mongoose.Types.ObjectId(matiere._id);

    // Create a new Matiere object with the module id
    const newEpreuve = new Epreuve({
      ...req.body,
      Code_mat: matiereId,
    });

    // Save the new Matiere object to the database
    const savedEpreuve = await newEpreuve.save();

    // Send the saved Matiere object as a response
    res.status(201).json(savedEpreuve);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});



router.get("/:name", (req, res, next) => {
  //  if (!ObjectId.isValid(req.params.name)) {
  //     return res.status(400).json({ message: 'ID invalide' });
  //  }
   
   Epreuve.findOne({ NomEpreuve: req.params.name })
   .populate( {path: 'Code_mat',model: 'Matiere'} )
   .exec((err, epreuve) => {
      if (err) {
         return res.status(500).json({ message: err.message });
      }
      if (!epreuve) {
         return res.status(404).json({ message: 'Epreuve non trouvée' });
      }
      res.json(epreuve );
   });
});


router.get("/id/:id", (req, res, next) => {
  //  if (!ObjectId.isValid(req.params.name)) {
  //     return res.status(400).json({ message: 'ID invalide' });
  //  }
   
   Epreuve.findOne({ _id: req.params.id })
   .populate( {path: 'Code_mat',model: 'Matiere'} )
   .exec((err, epreuve) => {
      if (err) {
         return res.status(500).json({ message: err.message });
      }
      if (!epreuve) {
         return res.status(404).json({ message: 'Epreuve non trouvée' });
      }
      res.json(epreuve );
   });
});



// Define the PUT route for updating an Epreuve by ID
router.put('/:id', async (req, res) => {
  try {
    const epreuve = await Epreuve.findById(req.params.id);
    if (!epreuve) {
      return res.status(404).send({ error: 'Epreuve not found' });
    }

    // If Code_mat is in the request body, update it with the corresponding ObjectId
    if (req.body.Code_mat) {
      const matiere = await Matiere.findOne({ LibelleMatiere: req.body.Code_mat });
      if (!matiere) {
        return res.status(400).send({ error: 'Invalid Code_mat' });
      }
      req.body.Code_mat = matiere._id;
    }

    // Update the Epreuve with the new data
    const updatedEpreuve = await Epreuve.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(updatedEpreuve);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// delete a user from database
router.delete('/:id', async (req, res, next) => {
  try {
    const epreuve = await Epreuve.findById(req.params.id);
    if (!epreuve) {
      return res.status(404).json({ message: "Epreuve not found" });
    }
    await epreuve.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "Epreuve deleted successfully" });
  } catch (err) {
    return next(err);
  }
});

//getting epreuve and data matiere inside



//getting the matiere of modules
router.get("/epreuves/:matiereID" , (req,res,next)=>{
  Epreuve.find({matiere:req.params.matiereID}).then((epreuve) =>{
    res.send(epreuve);
  })
})
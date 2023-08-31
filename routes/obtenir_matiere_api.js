const express = require("express");
const Etudiant = require("../models/etudiant");
const Filiere = require("../models/filiere");
const Classes = require("../models/classes");  
const Resultat = require("../models/resultat_general"); 
const Note= require("../models/note");  
const Epreuve =require("../models/epreuve");  
const Obtenirmatiere=require("../models/obtenir_matiere");   
const Matiere = require("../models/matiere");
const Module = require("../models/module");
const router = express.Router();
module.exports = router;



router.get("/notes/aa", async (req, res) => {
  try {
    const notes = await Note.aggregate([
      {
        $lookup: {
          from: 'epreuves',
          localField: 'Code_E',
          foreignField: '_id',
          as: 'epreuve',
        },
      },
      // Jointure avec la collection Etudiant pour récupérer le nom de l'étudiant
      {
        $lookup: {
          from: 'etudiants',
          localField: 'Code_Et',
          foreignField: '_id',
          as: 'student', 
        
        }
      }, 

      {
        $lookup: {
          from: 'classes',
          localField: 'student.Code_C',
          foreignField: '_id',
          as: 'classe', 
        }
      }, 

      {
        $lookup: {
          from: 'filieres',
          localField: 'classe.Code_F',
          foreignField: '_id',
          as: 'filiere', 
        }
      }, 


      {
        $lookup: {
          from: 'matieres',
          localField: 'epreuve.Code_mat',
          foreignField: '_id',
          as: 'matiere', 
        }
      }, 
      {
        $lookup: {
          from: 'modules',
          localField: 'matiere.Code_M',
          foreignField: '_id',
          as: 'module', 
        }
      }, 
      {
        $addFields: {
          Nom: { $arrayElemAt: ["$student.Nom", 0] },
          Prenom: { $arrayElemAt: ["$student.Prenom", 0] },
          Code_mat: "$matiere._id" ,
          LibelleMatiere:  "$matiere.LibelleMatiere" ,
          Nom_C : "$classe.Nom_C", 
          Nom_F:"$filiere.Nom_F", 
          LibelleMatiere :"$matiere.LibelleMatiere",
        },
      },
      {
        $group: {
          _id: {
            Code_mat: "$Code_mat",
            Code_Et: "$Code_Et",
            Nom: "$Nom",
            Prenom: "$Prenom",
            LibelleMatiere: "$LibelleMatiere", 
            Nom_C:"$Nom_C", 
            Nom_F:"$Nom_F", 
            LibelleMatiere : "$LibelleMatiere"
          },
          avgNote: { $avg: "$Note" },
        },
      },
      {
        $project: {
          _id: 0,
          Code_mat: "$_id.Code_mat",
          Code_Et: "$_id.Code_Et",
          Nom: "$_id.Nom",
          Prenom: "$_id.Prenom",
          Matiere: "$_id.LibelleMatiere",
       classe : "$_id.Nom_C", 
       filiere:"$_id.Nom_F",  
       module : "$_id.LibelleMatiere",
          avgNote: 1,
        },
      },
    ]);

    // update the NoteMatiere field for each document in the Obtenirmatiere collection
    for (const note of notes) {
      await Obtenirmatiere.updateOne(
        { etudiant: note.Code_Et, matiere: note.Code_mat },
        { $set: { NoteMatiere: note.avgNote } },
        { upsert: true }
      );
    }

    res.send(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving or updating notes in the database");
  }
}); 
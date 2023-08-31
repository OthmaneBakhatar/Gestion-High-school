



const express = require("express");
const Etudiant = require("../models/etudiant");
const Filiere = require("../models/filiere");
const Classes = require("../models/classes");  

const Note= require("../models/note");  
const Epreuve =require("../models/epreuve");  
const Obtenirmatiere=require("../models/obtenir_matiere");    
const Obtenirmodule=require("../models/obtenir_module");   
const Matiere = require("../models/matiere");
const Module = require("../models/module"); 
const ResultatsModule = require("../models/resultat"); 
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
      const avgByModule = await Obtenirmatiere.aggregate([
        {
          $lookup: {
            from: 'etudiants',
            localField: 'etudiant',
            foreignField: '_id',
            as: 'etudiant',
          },
        },
        {
          $unwind: '$etudiant',
        },
        {
          $lookup: {
            from: 'classes',
            localField: 'etudiant.Code_C',
            foreignField: '_id',
            as: 'classe',
          },
        },
        {
          $unwind: '$classe',
        },
        {
          $lookup: {
            from: 'filieres',
            localField: 'classe.Code_F',
            foreignField: '_id',
            as: 'filiere',
          },
        },
        {
          $unwind: '$filiere',
        },
        {
          $lookup: {
            from: 'matieres',
            localField: 'matiere',
            foreignField: '_id',
            as: 'matiere',
          },
        },
        {
          $unwind: '$matiere',
        },
        {
          $lookup: {
            from: 'modules',
            localField: 'matiere.Code_M',
            foreignField: '_id',
            as: 'module',
          },
        },
        {
          $unwind: '$module',
        },
        {
          $project: {
            _id: 0,
            Code_Et: '$etudiant._id',
            Nom_Et: '$etudiant.Nom',
            Prenom_Et: '$etudiant.Prenom',
            Nom_C: '$classe.Nom_C',
            Nom_F: '$filiere.Nom_F',
            Code_Mod: '$module._id',
            LibelleModule: '$module.LibelleModule',
            NoteMatiere: {
              $multiply: ['$NoteMatiere', '$matiere.coefficient'],
            },
          },
        },
        {
          $group: {
            _id: {
              Code_Et: '$Code_Et',
              Nom_Et: '$Nom_Et',
              Prenom_Et: '$Prenom_Et',
              Code_Mod: '$Code_Mod',
              Nom_C: '$Nom_C',
              Nom_F: '$Nom_F',
              LibelleModule: '$LibelleModule',
            },
            avgNote: { $sum: '$NoteMatiere' },
          },
        }, 
      
        {
          $group: {
            _id: {
              Code_Et: '$_id.Code_Et',
              Nom_Et: '$_id.Nom_Et',
              Prenom_Et: '$_id.Prenom_Et',
              Nom_C: '$_id.Nom_C',
              Nom_F: '$_id.Nom_F',
            },
            modules: {
              $push: {
                Code_Mod: '$_id.Code_Mod',
                LibelleModule: '$_id.LibelleModule',
                avgNote: '$avgNote',
              },
            },
            avgByStudent: { $avg: '$avgNote' },
          },
        },
      ]);  

      for (const avgByModul of avgByModule) { 
        let modules = avgByModul.modules;
        if (modules.length === 8) {
          for (const mod of modules) { 
            await ResultatsModule.updateOne(
              { Code_Et: avgByModul._id.Code_Et },
              { $set: { moyenne: mod.avgByStudent } },
              { upsert: true }
            );
          }
        } else {
          await ResultatsModule.updateMany(
            { etudiant: avgByModul._id.Code_Et },
            { $unset: { NoteModule: 1 } }
          );
          avgByModul.avgByStudent = 0;
        }
      } 
    
    //   res.send(avgByModule);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving average by module in the database');
    }
  });
  
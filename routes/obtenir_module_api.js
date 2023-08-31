

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
const router = express.Router();
module.exports = router;



// router.get('/', async (req, res) => {
//   try {
//     const avgByModule = await Obtenirmatiere.aggregate([
//       {
//         $lookup: {
//           from: 'etudiants',
//           localField: 'etudiant',
//           foreignField: '_id',
//           as: 'etudiant',
//         },
//       },
//       {
//         $unwind: '$etudiant',
//       },
//       {
//         $lookup: {
//           from: 'matieres',
//           localField: 'matiere',
//           foreignField: '_id',
//           as: 'matiere',
//         },
//       },
//       {
//         $unwind: '$matiere',
//       },
//       {
//         $lookup: {
//           from: 'modules',
//           localField: 'matiere._id',
//           foreignField: '_id',
//           as: 'module',
//         },
//       },
//       {
//         $unwind: '$module',
//       },
//       {
//         $project: {
//           _id: 0,
//           Code_Et: '$etudiant._id',
//           Nom: '$etudiant.Nom',
//           Prenom: '$etudiant.Prenom',
//           Code_Mod: '$module._id',
//           LibelleModule: '$module.LibelleModule',
//           NoteMatiere: {
//             $multiply: ['$Note', '$matiere.coefficient'],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             Code_Et: '$Code_Et',
//             Code_Mod: '$Code_Mod',
//           },
//           Nom: { $first: '$Nom' },
//           Prenom: { $first: '$Prenom' },
//           LibelleModule: { $first: '$LibelleModule' },
//           avgNote: { $avg: '$NoteMatiere' },
//         },
//       },
//     ]);

//     res.send(avgByModule);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving average by module in the database');
//   }
// }); 
















// router.get('/', async (req, res) => {
//   // try {
//   //   const avgByModule = await Obtenirmatiere.aggregate([
//   //     {
//   //       $lookup: {
//   //         from: 'etudiants',
//   //         localField: 'etudiant',
//   //         foreignField: '_id',
//   //         as: 'etudiant',
//   //       },
//   //     },
//   //     {
//   //       $unwind: '$etudiant',
//   //     },
//   //     {
//   //       $lookup: {
//   //         from: 'matieres',
//   //         localField: 'matiere',
//   //         foreignField: '_id',
//   //         as: 'matiere',
//   //       },
//   //     },
//   //     {
//   //       $unwind: '$matiere',
//   //     },
//   //     {
//   //       $lookup: {
//   //         from: 'modules',
//   //         localField: 'matiere._id',
//   //         foreignField: '_id',
//   //         as: 'module',
//   //       },
//   //     },
//   //     {
//   //       $unwind: '$module',
//   //     },
//   //     {
//   //       $project: {
//   //         _id: 0,
//   //         Code_Et: '$etudiant._id',
//   //         Nom: '$etudiant.Nom',
//   //         Prenom: '$etudiant.Prenom',
//   //         Code_Mod: '$module._id',
//   //         LibelleModule: '$module.LibelleModule',
//   //         NoteMatiere: {
//   //           $multiply: ['$NoteMatiere', '$matiere.coefficient'],
//   //         },
//   //       },
//   //     },
//   //     {
//   //       $group: {
//   //         _id: {
//   //           Code_Et: '$Code_Et',
//   //           Code_Mod: '$Code_Mod',
//   //         },
//   //         Nom: { $first: '$Nom' },
//   //         Prenom: { $first: '$Prenom' },
//   //         LibelleModule: { $first: '$LibelleModule' },
//   //         avgNote: { $avg: '$NoteMatiere' },
//   //       },
//   //     },
//   //     {
//   //       $group: {
//   //         _id: {
//   //           Code_Et: '$_id.Code_Et',
//   //           Nom: '$Nom',
//   //           Prenom: '$Prenom',
//   //         },
//   //         modules: {
//   //           $push: {
//   //             Code_Mod: '$_id.Code_Mod',
//   //             LibelleModule: '$LibelleModule',
//   //             avgNote: '$avgNote',
//   //           },
//   //         },
//   //         avgByStudent: { $avg: '$avgNote' },
//   //       },
//   //     },
//   //   ]);

//   //   res.send(avgByModule);
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).send('Error retrieving average by module in the database');
//   // } 


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
          $unwind: '$classe',
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
            Nom_C : '$classe.Nom_C',  
            Nom_F : '$filiere.Nom_F', 
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
              Nom_C:'$Nom_C', 
              Nom_F:'$Nom_F',
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
              Nom_C:'$_id.Nom_C', 
              Nom_F:'$_id.Nom_F',
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
        // {
        //   $project: {
        //     _id: 0,
        //     Code_Et: "_id.$Code_Et",
          
        //   },
        // },
      ]);
      for (const avgByModul of avgByModule) { 

        for (mod of avgByModul.modules ) 
        {   await Obtenirmodule.updateOne(
          { etudiant: avgByModul._id.Code_Et, module: mod.Code_Mod },
          { $set: { NoteModule: mod.avgNote } },
          { upsert: true }
        );

        }
      
      } 
  
      res.send(avgByModule);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving average by module in the database');
    }
  }); 
  


  //****************************************************************** */


  router.get('/aa', async (req, res) => {
    try { 
      const avgByModule = await Obtenirmatiere.aggregate([
        {
          $lookup: {
            from: 'etudiants',
            localField: 'etudiant',
            foreignField: '_id',
            as: 'etudiant',
            let: { etudiantId: '$etudiant' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$etudiantId'] } } },
              { $project: { _id: 1 } },
              { $limit: 1 }
            ]
          }
        },
        {
          $unwind: '$etudiant',
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
            Code_Mod: '$module._id',
            avgNote: {
              $multiply: ['$NoteMatiere', '$matiere.coefficient'],
            },
          },
        },
        {
          $group: {
            _id: {
              Code_Et: '$Code_Et',
              Code_Mod: '$Code_Mod',
            },
            avgNote: { $avg: '$avgNote' },
          },
        },
        {
          $project: {
            _id: 0,
            Code_Et: '$_id.Code_Et',
            Code_Mod: '$_id.Code_Mod',
            avgNote: 1,
          },
        },
        {
          $merge: {
            into: 'Obtenirmodule',
            on: ['Code_Et', 'Code_Mod'],
            whenMatched: 'replace',
            whenNotMatched: 'insert',
          },
        },
      ]);
  
      res.send(avgByModule);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving average by module in the database');
    }
  });
  
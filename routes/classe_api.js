
const express = require("express"); 
const mongoose =require ('mongoose');
const router = express.Router();
const Filiere = require("../models/filiere");
const Classes=require("../models/classes");
const Epreuve = require("../models/epreuve");
const Matiere = require("../models/matiere");
const Module = require("../models/module");
const Note = require("../models/note");
const Resultatmodules = require("../models/resultat_module");
const Resultat = require("../models/resultat_general");
const Resultatsclasse = require("../models/resultat_classe");
const Obtenirmatiere  = require("../models/obtenir_matiere");
const Obtenirmodule  = require("../models/obtenir_module");
const Etudiant = require("../models/etudiant");
const { findOneAndUpdate } = require("../models/etudiant");
// models


// get a list of classes from the database
router.get('/', async (req, res) => {
  const filieres = await Classes.aggregate([
    // Lookup the filiere for each classe
    {
      $lookup: {
        from: 'filieres',
        localField: 'Code_F',
        foreignField: '_id',
        as: 'filiere',
      },
    },
    {
      $unwind: '$filiere',
    },
    // Count the number of students in each classe
    {
      $lookup: {
        from: 'etudiants',
        localField: '_id',
        foreignField: 'Code_C',
        as: 'etudiants',
      },
    },
    {
      $addFields: {
        nbr_etud: { $size: '$etudiants' },
      },
    },
    // Count the number of modules in each classe
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'Code_C',
        as: 'modules',
      },
    },
    {
      $addFields: {
        nbr_modules: { $size: '$modules' },
      },
    },
    // Group by filiere and push the classe data into an array
    {
      $group: {
        _id: '$filiere',
        classes: {
          $push: {
            _id: '$_id',
            nbr_etud: '$nbr_etud',
            nbr_modules: '$nbr_modules', 
            Nom_c:'$Nom_C',
            modules: '$modules',
          },
        },
      },
    },
    // Project the desired output format
    {
      $project: {
        filiere: '$_id',
        classes_data: '$classes',
        classes: { $size: '$classes' },
        total: { $sum: '$classes.nbr_etud' },
        _id: 0,
      },
    },
  ]);

  console.log('Filieres: ', filieres);
  res.send(filieres); 
  
});  






// add a new user to the database

router.post("/", (req, res) => { 
  Filiere.findOne({Nom_F:req.body.Nom_F}).then((result) => { 

    const Class= { 
      "Nom_C":req.body.Nom_C, 
      "Code_F":result._id
     } 
   
     Classes.create(Class)
       .then((classes) => {
         res.send(classes);
       })
       .catch((err) => {
         res.send({
           error: err.message,
         });
       });
  });

 
});
// update a user to the database
router.put("/:id", (req, res) => { 

  Filiere.findOne({Nom_F:req.body.Nom_F}).then((result) => { 

    const Class= { 
      "Nom_C":req.body.Nom_C, 
      "Code_F":result._id
     }  

     Classes.findOneAndUpdate({_id:req.params.id},Class).then((classes) => {
         res.send(Class);
       })
       .catch((err) => {
         res.send({
           error: err.message,
         });
       });
  });
 
});

// delete a user from database
// router.delete("/:id", async (req, res) => { 
//   const id_f =req.params.id; 
//   try {   const find_c= await Classes.find({ _id: id_f });
//  await Classes.deleteOne({ _id: id_f }); 
  

   
// const delete_rc= await Resultatsclasse.deleteMany({ Code_C: find_c._id }, function(err, result) {
//   console.log(`${result.deletedCount} Resultat_classe ont été supprimés`);
  
// });
// const delete_rm= await Resultatmodules.deleteMany({ Code_C: find_c._id }, function(err, result) {
//   console.log(`${result.deletedCount} resultat_module ont été supprimés`);
  
// }); 
// const find_et= await Etudiant.find({ Code_C: find_c._id }); 
// const delete_et= await Etudiant.deleteMany({ Code_C: find_c._id }, function(err, result) {
//   console.log(`${result.deletedCount} etudiant ont été supprimés`);

// }); 
// for (et of find_et) 
// { 
//   const delete_et= await Resultat.deleteMany({ Code_Et: et._id }, function(err, result) {
//     console.log(`${result.deletedCount} Resultat ont été supprimés`);
    
//   }); 
// }  

// const find_m= await Module.find({ Code_C: find_c._id });  
// const delete_m= await Module.deleteMany({ Code_C: find_c._id }, function(err, result) {
//   console.log(`${result.deletedCount} Module ont été supprimés`);
  
// }); 
// for (mod of find_m)  
// {  const delete_OM= await Obtenirmodule.deleteMany({ Code_M: mod._id }, function(err, result) {
//   console.log(`${result.deletedCount} Obtenir_module ont été supprimés`);

// }); 
// const find_matiere= await Matiere.find({ Code_M: mod._id });  
//   const delete_matiere= await Matiere.deleteMany({ Code_M: mod._id }, function(err, result) {
//     console.log(`${result.deletedCount} matiere ont été supprimés`);
   
//   });  
//   for (mat of find_matiere) 
//   { 
//     const delete_OMA= await Obtenirmatiere.deleteMany({ Code_mat: mat._id }, function(err, result) {
//       console.log(`${result.deletedCount} obtenir_matiere ont été supprimés`);
   
//     });  
    
//     const find_ep= await Epreuve.find({ Code_mat: mat._id });  
//   const delete_ep= await Epreuve.deleteMany({ Code_mat: mat._id }, function(err, result) {
//     console.log(`${result.deletedCount} epreuve ont été supprimés`);
    
//   });  
//   for (ep of find_ep)  
//   { 
//     const delete_note= await Note.deleteMany({ Num_E: ep._id }, function(err, result) {
//       console.log(`${result.deletedCount} note ont été supprimés`);
      
//     });  
//   }
//   }
// }
// }
     
  
//   catch (e) { 
// res.send (e);
//   }
 
// });


router.delete('/:id', async (req, res, next) => {
  try {
    const matiere = await Classes.findById(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: "Classe not found" });
    }
    await matiere.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "Classe deleted successfully" });
  } catch (err) {
    return next(err);
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params; // get the id from params

  const filieres = await Classes.aggregate([
    // Match the classes by id
    {
      $match: {
        _id: mongoose.Types.ObjectId(id), // convert the id to ObjectId format
      },
    },
    // Lookup the filiere for each classe
    {
      $lookup: {
        from: 'filieres',
        localField: 'Code_F',
        foreignField: '_id',
        as: 'filiere',
      },
    },
    {
      $unwind: '$filiere',
    },
    // Count the number of students in each classe
    {
      $lookup: {
        from: 'etudiants',
        localField: '_id',
        foreignField: 'Code_C',
        as: 'etudiants',
      },
    },
    {
      $addFields: {
        nbr_etud: { $size: '$etudiants' },
      },
    },
    // Count the number of modules in each classe
    {
      $lookup: {
        from: 'modules',
        localField: '_id',
        foreignField: 'Code_C',
        as: 'modules',
      },
    },
    {
      $addFields: {
        nbr_modules: { $size: '$modules' },
      },
    },
    // Group by filiere and push the classe data into an array
    {
      $group: {
        _id: '$filiere',
        classes: {
          $push: {
            _id: '$_id',
            nbr_etud: '$nbr_etud',
            nbr_modules: '$nbr_modules',
            Nom_c: '$Nom_C',
            modules: '$modules',
          },
        },
      },
    },
    // Project the desired output format
    {
      $project: {
        filiere: '$_id',
        classes_data: '$classes',
        classes: { $size: '$classes' },
        total: { $sum: '$classes.nbr_etud' },
        _id: 0,
      },
    },
  ]);

  console.log('Filiere: ', filieres);   

  res.send(filieres); 
});


router.get("/liste/:nomF", async (req, res) => {
  try {
    const filiere = await Filiere.findOne({ Nom_F: req.params.nomF });
    if (!filiere) {
      return res.status(404).json({ message: "Filiere not found" });
    }

    const classes = await Classes.find({ Code_F: filiere._id });

    const response = classes.map((classe) => ({
      Nom_C: classe.Nom_C,
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;

const express = require("express");
const Etudiant = require("../models/etudiant");
const Filiere = require("../models/filiere");
const Classes = require("../models/classes");  
const { deleteOne } = require("../models/etudiant");
const Resultatsclasse = require("../models/resultat_classe");  
const Module = require("../models/module"); 
const ResultatsModule = require("../models/resultat_module");
const Matiere = require("../models/matiere");
const Obtenirmodule = require("../models/obtenir_module");
const Obtenirmatiere = require("../models/obtenir_matiere");
const Epreuve = require("../models/epreuve");
const Note = require("../models/note");
const Resultat = require("../models/resultat_general"); 
  
 
const router = express.Router();
module.exports = router;




//   router.get("/", async (req, res) => {
  
//     const classes = await Classes.find({}).populate({ path: "Code_F", model: 'Filiere', strictPopulate: false });
//     // res.send(classes);
//     // console.log('Classes: ', classes);
    
// //     // Aggregate the Classe documents to compute the desired output
//     const filieres = await Classes.aggregate([
//         {
//          $group: {
//           _id: "$Code_F",
//           total: { $sum: "$Nb_Etude" }
//          }
//       },
//       {
//        $lookup: {
//  from: "filieres",
//         localField: "Code_F",
//        foreignField: "_id",
//        as: "filiere"
//        }
//      },
//      {
//        $unwind: "$Code_F"
//        },
//       {
//         $project: {
//           _id: 0,
//            filiere: "$Code_F",
//           classe: classes.filter(c => c.Code_F._id.equals('$_id')),
//           total: 1
//         }
//       }
//   ]);
  
// //     console.log('Filieres: ', filieres);
    
//     res.send(filieres);
// //    
// }); 

// router.get('/', async (req, res) => { 

//   const filieres = await Classes.aggregate([
//     {
//       $group: {
//         _id: '$Code_F',
//         total: { $sum: '$nbr_etud' },
//         classes: { $push: '$$ROOT' },
//       },
//     },
//     {
//       $lookup: {
//         from: 'filieres',
//         localField: '_id',
//         foreignField: '_id',
//         as: 'filiere',
//       },
//     },
//     {
//       $unwind: '$filiere',
//     },
//     {
//       $project: {
//         _id: 0,
//         filiere: '$filiere',
//         classes_data: '$classes',
//         classes: { $size: '$classes' },
//         total: 1,
//       },
//     },
//     {
//       $group: {
//         _id: '$filiere',
//         classes_data: { $first: '$classes_data' },
//         classes: { $sum: '$classes' },
//         total: { $first: '$total' },
//       },
//     },
//     {
//       $lookup: {
//         from: 'etudiants',
//         localField: 'classes_data._id',
//         foreignField: 'Code_C',
//         as: 'etudiants',
//       },
//     },
//     {
//       $group: {
//         _id: '$_id',
//         classes_data: { $first: '$classes_data' },
//         classes: { $first: '$classes' },
//         total: { $first: '$total' },
//         total_etudiants: { $sum: { $size: '$etudiants' } },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         filiere: '$_id',
//         classes_data: 1,
//         classes: 1,
//         total: 1,
//         total_etudiants: 1,
//       },
//     },
//   ]);
  

//   res.send(filieres);
//   // Aggregate the Classe documents to compute the desired output
// })




router.get('/', async (req, res) => { 

  const filieres = await Filiere.aggregate([
    {
      $lookup: {
        from: 'classes',
        localField: '_id',
        foreignField: 'Code_F',
        as: 'classes_data',
      },
    },
    {
    $project: {
    _id: 1,
    filiere: '$Nom_F', 
    desc : '$desc',
    classes_data: 1,
    classes: { $size: '$classes_data' },
    total: { $sum: '$classes_data.nbr_etud' },
    total_etudiants: { $sum: { $size: '$classes_data.etudiants' } },
  },
},
    
  ]);
  

  res.send(filieres);
});


router.get('/:id', async (req, res) => { 
const id=req.params.id;
  const filieres = await Classes.aggregate([
    {
      $group: {
        _id: '$Code_F',
        total: { $sum: '$nbr_etud' },
        classes: { $push: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: 'filieres',
        localField: '_id',
        foreignField: '_id',
        as: 'filiere',
      },
    },
    {
      $unwind: '$filiere',
    },
    {
      $project: {
        _id: 0,
        filiere: '$filiere',
        classes_data: '$classes',
        classes: { $size: '$classes' },
        total: 1,
      },
    },
    {
      $group: {
        _id: '$filiere',
        classes_data: { $first: '$classes_data' },
        classes: { $sum: '$classes' },
        total: { $first: '$total' },
      },
    },
    {
      $lookup: {
        from: 'etudiants',
        localField: 'classes_data._id',
        foreignField: 'Code_C',
        as: 'etudiants',
      },
    },
    {
      $group: {
        _id: '$_id',
        classes_data: { $first: '$classes_data' },
        classes: { $first: '$classes' },
        total: { $first: '$total' },
        total_etudiants: { $sum: { $size: '$etudiants' } },
      },
    },
    {
      $project: {
        _id: 0,
        filiere: '$_id',
        classes_data: 1,
        classes: 1,
        total: 1,
        total_etudiants: 1,
      },
    },
  ]);
  for (et of filieres) 
  {
   
      if (et.filiere._id==id) 
      { 
        res.send (et); 
        console.log(et);
      }
    
  } 





  
 
  // Aggregate the Classe documents to compute the desired output
}) 




router.get('/find', async (req, res) => { 
  Filiere.find({}).select('Nom_F').exec(function(err, filieres) {
    if (err) {
      console.log(err);
    } else {
      res.send(filieres);
    }
  });
  
}); 


router.get('/nom/:Nom', async (req, res) => { 
  const Nom_F=req.params.Nom;
    const filieres = await Classes.aggregate([
      {
        $group: {
          _id: '$Code_F',
          total: { $sum: '$nbr_etud' },
          classes: { $push: '$$ROOT' },
        },
      },
      {
        $lookup: {
          from: 'filieres',
          localField: '_id',
          foreignField: '_id',
          as: 'filiere',
        },
      },
      {
        $unwind: '$filiere',
      },
      {
        $project: {
          _id: 0,
          filiere: '$filiere',
          classes_data: '$classes',
          classes: { $size: '$classes' },
          total: 1,
        },
      },
      {
        $group: {
          _id: '$filiere',
          classes_data: { $first: '$classes_data' },
          classes: { $sum: '$classes' },
          total: { $first: '$total' },
        },
      },
      {
        $lookup: {
          from: 'etudiants',
          localField: 'classes_data._id',
          foreignField: 'Code_C',
          as: 'etudiants',
        },
      },
      {
        $group: {
          _id: '$_id',
          classes_data: { $first: '$classes_data' },
          classes: { $first: '$classes' },
          total: { $first: '$total' },
          total_etudiants: { $sum: { $size: '$etudiants' } },
        },
      },
      {
        $project: {
          _id: 0,
          filiere: '$_id',
          classes_data: 1,
          classes: 1,
          total: 1,
          total_etudiants: 1,
        },
      },
    ]);
    for (et of filieres) 
    {
     
        if (et.filiere.Nom_F==Nom_F) 
        { 
          res.send (et); 
          console.log(et);
        }
      
    }
 
  // Aggregate the Classe documents to compute the desired output
})





// router.delete("/delete/:id", async (req, res) => { 
//   const id_f =req.params.id; 
//   try { 
//  await Filiere.deleteOne({ _id: id_f }); 
//    const find_c=   await Classes.find({ Code_F: id_f });
//  await Classes.deleteMany({ Code_F: id_f }, function(err, result) {
//   console.log(`${result.deletedCount} classe ont été supprimés`);
  
// }); 
//     for (const delete1 of find_c) 
//     { 
// const delete_rc= await Resultatsclasse.deleteMany({ Code_C: delete1._id }, function(err, result) {
//   console.log(`${result.deletedCount} Resultat_classe ont été supprimés`);
  
// });
// const delete_rm= await ResultatsModule.deleteMany({ Code_C: delete1._id }, function(err, result) {
//   console.log(`${result.deletedCount} resultat_module ont été supprimés`);
  
// }); 
// const find_et= await Etudiant.find({ Code_C: delete1._id }); 
// const delete_et= await Etudiant.deleteMany({ Code_C: delete1._id }, function(err, result) {
//   console.log(`${result.deletedCount} etudiant ont été supprimés`);

// }); 
// for (et of find_et) 
// { 
//   const delete_et= await Resultat.deleteMany({ Code_Et: et._id }, function(err, result) {
//     console.log(`${result.deletedCount} Resultat ont été supprimés`);
    
//   }); 
// }  

// const find_m= await Module.find({ Code_C: delete1._id });  
// const delete_m= await Module.deleteMany({ Code_C: delete1._id }, function(err, result) {
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
//     const delete_OMA= await Obtenirmatiere.deleteMany({ Code_matiere: mat._id }, function(err, result) {
//       console.log(`${result.deletedCount} obtenir_matiere ont été supprimés`);
   
//     });  
    
//     const find_ep= await Epreuve.find({ Code_matiere: mat._id });  
//   const delete_ep= await Epreuve.deleteMany({ Code_matiere: mat._id }, function(err, result) {
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
     
//   } 
//   catch (e) { 
// res.send ("id n'existe pas");
//   }
 
// }); 





router.delete('/:id', async (req, res, next) => {
  try {
    const matiere = await Filiere.findById(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: "Filiere not found" });
    }
    await matiere.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "filiere deleted successfully" });
  } catch (err) {
    return next(err);
  }
});
  
  
  router.post("/", (req, res) => { 
    console.log(req.body)
    Filiere.create(req.body)
      .then((filiere) => {
       res.send(filiere);
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  });
  // update a user to the database
  router.put("/:id", (req, res) => {
    Filiere.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
      Filiere.findOne({ _id: req.params.id }).then((filieres) => {
        res.send(filieres);
      });
    });
  });

const express = require("express");
const Matiere = require("../models/matiere");
const Module = require("../models/module");
const Epreuve = require("../models/epreuve");
const Note = require('../models/note');
const Obtenirmatiere = require('../models/obtenir_matiere');
const mongoose=require('mongoose');
const router = express.Router();

// models


// get a list of modules from the database
// router.get("/", (req, res, next) => {
//   Matiere.aggregate([
//     // Match Matiere documents with a non-null module field
//     {
//       $match: {
//         Code_M: { $exists: true }
//       }
//     },
//     // Join with the Epreuve collection to group by matiere and count the Epreuve documents
//     {
//       $lookup: {
//         from: "epreuves",
//         let: {matiereId: "$_id" },
//         pipeline: [
//           { $match: { $expr: { $eq: ["$matieres", "$$matiereId"] } } },
//           { $group: { _id: null, count: { $sum: 1 } } }
//         ],
//         as: "epreuves"
//       }
//     },
//     // Unwind the epreuves array to get a single object
//     {
//       $unwind: {
//         path: "$epreuves",
//         preserveNullAndEmptyArrays: true
//       }
//     },
//     // Project the fields to keep only what we need
//     {
//       $project: {
//         _id: 1,
//         LibelleMatiere: 1,
//         coefficient: 1,
//         VH_CM:1,
//         VH_TP:1,
//         VH_TD:1,
//         "module.LibelleModule": 1,
//         count: { $ifNull: ["$epreuves.count", 0] }
//       }
//     }
//   ]).then((matieres) => {
//     res.json(matieres);
//   }).catch((err) => {
//     next(err);
//   });
  
// });
// router.get("/", (req, res, next) => {
//   Matiere.aggregate([
//     // Join with the modules collection to get the module field
//     {
//       $lookup: {
//         from: "modules",
//         localField: "Code_M",
//         foreignField: "_id",
//         as: "module"
//       }
//     },
//     // Match Matiere documents with a non-null module field
//     {
//       $match: {
//         module: { $ne: [] }
//       }
//     },
//     // Join with the Epreuve collection to group by matiere and count the Epreuve documents
//     {
//       $lookup: {
//         from: "epreuves",
//         let: {matiereId: "$_id" },
//         pipeline: [
//           { $match: { $expr: { $eq: ["$matieres", "$$matiereId"] } } },
//           { $group: { _id: null, count: { $sum: 1 } } }
//         ],
//         as: "epreuves"
//       }
//     },
//     // Unwind the epreuves array to get a single object
//     {
//       $unwind: {
//         path: "$epreuves",
//         preserveNullAndEmptyArrays: true
//       }
//     },
//     // Project the fields to keep only what we need
//     {
//       $project: {
//         _id: 1,
//         LibelleMatiere: 1,
//         coefficient: 1,
//         VH_CM:1,
//         VH_TP:1,
//         VH_TD:1,
//         "module.LibelleModule": 1,
//         count: { $ifNull: ["$epreuves.count", 0] }
//       }
//     }
//   ]).then((matieres) => {
//     res.json(matieres);
//   }).catch((err) => {
//     next(err);
//   });
  
// });

router.get("/", (req, res, next) => {
  Matiere.aggregate([
    {
      $lookup: {
        from: "modules",
        localField: "Code_M",
        foreignField: "_id",
        as: "module"
      }
    },
    {
      $match: {
        module: { $ne: [] }
      }
    },
    {
      $lookup: {
        from: "epreuves",
        let: {matiereId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$Code_mat", "$$matiereId"] } } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        as: "epreuves"
      }
    },
    {
      $unwind: {
        path: "$epreuves",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        LibelleMatiere: 1,
        coefficient: 1,
        VH_CM:1,
        VH_TP:1,
        VH_TD:1,
        "module.LibelleModule": 1,
        count: { $ifNull: ["$epreuves.count", 0] }
      }
    }
  ]).then((matieres) => {
    res.json(matieres);
  }).catch((err) => {
    next(err);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Matiere.aggregate([
    // Match the Matiere document with the specified _id
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
      }
    },
    // Join with the Epreuve collection to group by matiere and count the Epreuve documents
    {
      $lookup: {
        from: "epreuves",
        let: {matiereId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$matieres", "$$matiereId"] } } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        as: "epreuves"
      }
    }, 

    {
      $lookup: {
        from: "modules",
        localField: "Code_M",
        foreignField: "_id",
        as: "module"
      }
    },
    
    // Unwind the epreuves array to get a single object
    {
      $unwind: {
        path: "$epreuves",
        preserveNullAndEmptyArrays: true
      }
    },
    // Project the fields to keep only what we need
    {
      $project: {
        _id: 1,
        LibelleMatiere: 1,
        coefficient: 1,
        VH_CM:1,
        VH_TP:1,
        VH_TD:1,
        "module.LibelleModule": 1,
        count: { $ifNull: ["$epreuves.count", 0] }
      }
    }
  ]).then((matieres) => {
    if (matieres.length === 0) {
      // Return a 404 error if the Matiere document with the specified _id is not found
      return res.status(404).json({ message: "Matiere not found" });
    }
    res.json(matieres[0]);
  }).catch((err) => {
    next(err);
  });
});


router.post('/', async (req, res) => {
  try {
    // Retrieve the id of the module using its name
    const module = await Module.findOne({ LibelleModule: req.body.module });
    if (!module) {
      return res.status(400).json({ message: "Module not found" });
    }

    // Convert the module id to an ObjectId
    const moduleId = mongoose.Types.ObjectId(module._id);

    // Create a new Matiere object with the module id
    const newMatiere = new Matiere({
      ...req.body,
      Code_M: moduleId,
    });

    // Save the new Matiere object to the database
    const savedMatiere = await newMatiere.save();

    // Send the saved Matiere object as a response
    res.status(201).json(savedMatiere);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});



// update a user to the database
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve the Matiere object by its ID
    const matiere = await Matiere.findById(id);

    if (!matiere) {
      return res.status(404).json({ message: "Matiere not found" });
    }

    // Retrieve the module by its name
    const module = await Module.findOne({ LibelleModule: req.body.module });

    if (!module) {
      return res.status(400).json({ message: "Module not found" });
    }

    // Update the Matiere object with the new values
    matiere.LibelleMatiere = req.body.LibelleMatiere || matiere.LibelleMatiere;
    matiere.VH_CM = req.body.VH_CM || matiere.VH_CM;
    matiere.VH_TD = req.body.VH_TD || matiere.VH_TD;
    matiere.VH_TP = req.body.VH_TP || matiere.VH_TP;
    matiere.Code_M = module._id || matiere.module;
    matiere.coefficient = req.body.coefficient || matiere.coefficient;

    // Save the updated Matiere object to the database
    const savedMatiere = await matiere.save();

    // Send the saved Matiere object as a response
    res.status(200).json(savedMatiere);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});


// delete a user from database

router.delete('/:id', async (req, res, next) => {
  try {
    const matiere = await Matiere.findById(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: "Matiere not found" });
    }
    await matiere.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "Matiere deleted successfully" });
  } catch (err) {
    return next(err);
  }
});


router.get("/infos/:LibelleMatiere", (req, res, next) => {
  const { LibelleMatiere } = req.params;
  Matiere.aggregate([
    // Match Matiere documents with a non-null module field
    {
      $match: {
        Code_M: { $exists: true },
        LibelleMatiere
      }
    },
    // Join with the Epreuve collection to group by matiere and count the Epreuve documents
    {
      $lookup: {
        from: "epreuves",
        let: {matiereId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$matieres", "$$matiereId"] } } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        as: "epreuves"
      }
    },
    // Unwind the epreuves array to get a single object
    {
      $unwind: {
        path: "$epreuves",
        preserveNullAndEmptyArrays: true
      }
    },
    // Project the fields to keep only what we need
    {
      $project: {
        _id: 1,
        LibelleMatiere: 1,
        coefficient: 1,
        VH_CM:1,
        VH_TP:1,
        VH_TD:1,
        "module.LibelleModule": 1,
        count: { $ifNull: ["$epreuves.count", 0] }
      }
    }
  ]).then((matieres) => {
    res.json(matieres);
  }).catch((err) => {
    next(err);
  });
});
module.exports = router;
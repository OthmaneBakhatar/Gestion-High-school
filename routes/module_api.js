const mongoose=require('mongoose');
const express = require("express");
const Matiere = require("../models/matiere");
const Classes=require("../models/classes");
const Semestre=require("../models/semestre");
const Module = require("../models/module");
const Obtenir_module = require('../models/obtenir_module');
const Epreuve = require('../models/epreuve');
const router = express.Router();






router.get("/", async (req, res) => {
  try {
    const modules = await Module.find().populate({
      path: "Code_C",
      model: "Classes", // register the Classes model with Mongoose
      populate: {
        path: "Code_F",
        model: "Filiere",
      },
    }).populate("Code_S");

    const response = await Promise.all(
      modules.map(async (module) => {
        const matieres = await Matiere.find({ Code_M: module._id });
        let VH_Global = 0;
        if (matieres && Array.isArray(matieres)) {
          VH_Global = matieres.reduce(
            (acc, matiere) =>
              acc +
              parseFloat(matiere.VH_CM) +
              parseFloat(matiere.VH_TD) +
              parseFloat(matiere.VH_TP),
            0
          );
        }
        return {
          _id: module._id,
          LibelleModule: module.LibelleModule,
          VH_Global,
          coefficient: module.coefficient,
          classe: module.Code_C.Nom_C, // access the properties of Code_C object using module.Code_C
          filiere: module.Code_C.Code_F.Nom_F,
          semestre: module.Code_S.Libelle,
          matieres: matieres
            ? matieres.map((matiere) => ({
                _id: matiere._id,
                LibelleMatiere: matiere.LibelleMatiere,
                VH_CM: matiere.VH_CM,
                VH_TD: matiere.VH_TD,
                VH_TP: matiere.VH_TP,
                coefficient: matiere.coefficient,
              }))
            : [],
          matiereCount: matieres ? matieres.length : 0,
        };
      })
    );

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});




router.get("/:moduleId", async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const module = await Module.findById(moduleId).populate({
      path: "Code_C",
      populate: {
        path: "Code_F",
        model: "Filiere",
      },
    }).populate("Code_S");

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const matieres = await Matiere.find({ Code_M: moduleId });
    let VH_Global = 0;
    if (matieres && Array.isArray(matieres)) {
      VH_Global = matieres.reduce(
        (acc, matiere) =>
          acc +
          parseFloat(matiere.VH_CM) +
          parseFloat(matiere.VH_TD) +
          parseFloat(matiere.VH_TP),
        0
      );
    }

    const response = {
      _id: module._id,
      LibelleModule: module.LibelleModule,
      VH_Global,
      coefficient: module.coefficient,
      classe: module.Code_C.Nom_C,
      filiere: module.Code_C.Code_F.Libelle_F,
      semestre: module.Code_S.Libelle,
      matieres: matieres
        ? matieres.map((matiere) => ({
            _id: matiere._id,
            LibelleMatiere: matiere.LibelleMatiere,
            VH_CM: matiere.VH_CM,
            VH_TD: matiere.VH_TD,
            VH_TP: matiere.VH_TP,
            coefficient: matiere.coefficient,
          }))
        : [],
      matiereCount: matieres ? matieres.length : 0,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/nom/modulenom", (req, res, next) => {
  Classes.find({}, "LibelleModule")
    .then((modules) => {
      res.json(modules);
    })
    .catch((err) => {
      next(err);
    });
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { LibelleModule, coefficient, classe, semestre } = req.body;

    // Find the classe and semestre documents that match the provided names
    const [classeName, semestreName] = await Promise.all([
      Classes.findOne({ Nom_C: classe }),
      Semestre.findOne({ Nom_S: semestre })
    ]);

    if (!classeName) {
      return res.status(400).json({ error: `Classe '${classe}' not found` });
    }

    if (!semestreName) {
      return res.status(400).json({ error: `Semestre '${semestre}' not found` });
    }

    // Find the module document by ID and update its fields
    const module = await Module.findByIdAndUpdate(
      id,
      {
        $set: {
          LibelleModule,
          coefficient,
          Code_C: classeName._id,
          Code_S: semestreName._id,
        },
      },
      { new: true }
    );

    if (!module) {
      return res.status(400).json({ error: `Module with ID '${id}' not found` });
    }

    res.status(200).json({ module });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//add


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const module = await Module.findById(id).populate({
      path: "Code_C",
      model: "Classes",
      populate: {
        path: "Code_F", 
        model: "Filiere",
      },
    }).populate("Code_S");

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const matieres = await Matiere.find({ Code_M: id });
    let VH_Global = 0;
    if (matieres && Array.isArray(matieres)) {
      VH_Global = matieres.reduce(
        (acc, matiere) =>
          acc +
          parseFloat(matiere.VH_CM) +
          parseFloat(matiere.VH_TD) +
          parseFloat(matiere.VH_TP),
        0
      );
    }

    const response = {
      _id: module._id,
      LibelleModule: module.LibelleModule,
      VH_Global,
      coefficient: module.coefficient,
      classe: module.Code_C.Nom_C,
      filiere: module.Code_C.Code_F.Nom_F,
      semestre: module.Code_S.Libelle,
      matieres: matieres
        ? matieres.map((matiere) => ({
            _id: matiere._id,
            LibelleMatiere: matiere.LibelleMatiere,
            VH_CM: matiere.VH_CM,
            VH_TD: matiere.VH_TD,
            VH_TP: matiere.VH_TP,
            coefficient: matiere.coefficient,
          }))
        : [],
      matiereCount: matieres ? matieres.length : 0,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.post('/', async (req, res) => {
  try {
    const { LibelleModule, coefficient, classe, semestre } = req.body;

    // Find the classe and semestre documents that match the provided names
    const [classeName, semestreName] = await Promise.all([
      Classes.findOne({ Nom_C: classe }),
      Semestre.findOne({ Nom_S: semestre})
    ]);

    if (!classeName) {
      return res.status(400).json({ error: `Classe '${classe}' not found` });
    }

    if (!semestreName) {
      return res.status(400).json({ error: `Semestre '${semestre}' not found` });
    }

    // Create a new module document with the provided fields
    const module = await Module.create({
      LibelleModule,
      coefficient,
      Code_C: classeName._id,
      Code_S: semestreName._id,
    });

    res.status(201).json({ module });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// delete a user from database


router.get("/nom/", (req, res, next) => {
  
  Module.find()
  .select('_id LibelleModule') // Include the id and LibelleModule fields
  .then((modules) => {
  res.send(modules);
  })
  .catch((err) => {
  next(err);
  });
  

});
router.get("/infos/:libelleModule", async (req, res) => {
  try {
    const modules = await Module.find({
      LibelleModule: req.params.libelleModule
    }).populate({
      path: "Code_C",
      populate: {
        path: "Code_F",
        model: "Filiere",
      },
    }).populate("Code_S");

    const response = await Promise.all(
      modules.map(async (module) => {
        const matieres = await Matiere.find({ Code_M: module._id });
        let VH_Global = 0;
        if (matieres && Array.isArray(matieres)) {
          VH_Global = matieres.reduce(
            (acc, matiere) =>
              acc +
              parseFloat(matiere.VH_CM) +
              parseFloat(matiere.VH_TD) +
              parseFloat(matiere.VH_TP),
            0
          );
        }
        return {
          _id: module._id,
          LibelleModule: module.LibelleModule,
          VH_Global,
          coefficient: module.coefficient,
          classe: module.Code_C.Nom_C,
          filiere: module.Code_C.Code_F.Libelle_F,
          semestre: module.Code_S.Libelle ,
          matieres: matieres
            ? matieres.map((matiere) => ({
                _id: matiere._id,
                LibelleMatiere: matiere.LibelleMatiere,
                VH_CM: matiere.VH_CM,
                VH_TD: matiere.VH_TD,
                VH_TP: matiere.VH_TP,
                coefficient: matiere.coefficient,
              }))
            : [],
          matiereCount: matieres ? matieres.length : 0,
        };
      })
    );

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const matiere = await Module.findById(req.params.id);
    if (!matiere) {
      return res.status(404).json({ message: "module not found" });
    }
    await matiere.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "module deleted successfully" });
  } catch (err) {
    return next(err);
  }
});
module.exports=router;













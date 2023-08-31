
const express = require("express");
const Semestre=require("../models/semestre");
const router = express.Router();
const mongoose = require('mongoose');
//get nom s
router.get("/", (req, res, next) => {
  Semestre.find({}, "Libelle")
    .then((semestres) => {
      res.json(semestres);
    })
    .catch((err) => {
      next(err);
    });
});



router.post("/", (req, res) => { 
  console.log(req.body)
  Semestre.create(req.body)
    .then((semestre) => {
     console.log(semestre);
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});
module.exports=router;
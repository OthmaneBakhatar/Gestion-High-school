const express = require("express");
const Etudiant = require("../models/etudiant");
const Filiere = require("../models/filiere");
const Classes = require("../models/classes");  
const Resultat = require("../models/resultat_general"); 
const Note= require("../models/note");  
const Obtenirmodule =require("../models/obtenir_module");  
const Obtenirmatiere=require("../models/obtenir_matiere");  
const router = express.Router();
module.exports = router;




  
router.post("/",(req,res)=>{
  
Classes.findOne({Nom_C:req.body.Nom_C}).then((classe)=>{
  if(!classe)
  {
    res.send("Not found")
  }
  else{
    
    Etudiant.find({CNE:req.body.CNE}).then((etudiant)=>{
      
      if(!etudiant.CNE)
      {
        const result={classe}
        //res.send(result)
        const student = {
          'CNE' : req.body.CNE,
          'Nom' : req.body.Nom,
          'Prenom' : req.body.Prenom,
          'Date_N':req.body.Date_N,
          'Code_C':classe._id, 
          'Type_Bac':req.body.Type_Bac,
      'Mention_Bac':req.body.Mention_Bac,
      'Academie':req.body.Academie,
      'Lycee':req.body.Lycee, 
      'Email':req.body.Email, 
      'Tele':req.body.Tele, 
      'adresse':req.body.adresse,
        } 
        Etudiant.create(student)
        .then((student)=>{
          res.send(student);
        })
        .catch((err)=>{
          res.send({
            error:err.message
          })
        })
      }
      else
      { 
        res.send("existe deja")
      }
    
      
    }) 
  }
})
})
  



// *********** get all********
router.get("/alls", async (req, res) => {
  try {
    const etudiants = await Etudiant.find({})
      .populate({ path: 'Code_C', model: 'Classes', strictPopulate: false});
    const resultat = []; 
    //  res.send (etudiants);
     for (const etudiant of etudiants) {
        const id_F = etudiant.Code_C.Code_F; 

        const filiere = await Filiere.findOne({ _id: id_F }).select({ Nom_F: 1 });
                //  res.send (etudiant);
         if (filiere) {
        const etud = { element: etudiant, nom_f: filiere.Nom_F };
       resultat.push(etud);
        }
     }
     res.send(resultat);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});  

router.get("/alls_id/:idd", async (req, res) => {
  try {
    const etudiants = await Etudiant.find({_id:req.params.idd})
      .populate({ path: 'Code_C', model: 'Classes', strictPopulate: false});
    
   
      const filiere = await Filiere.findOne({ _id: etudiants[0].Code_C.Code_F}).select({ Nom_F: 1 });
     
        const etud = { element: etudiants, nom_f: filiere.Nom_F };
       
      
   console.log("yesssssss");
    res.send(etud);
  } catch (err) {
    console.error(err);
    res.send("erreur");
  }
}); 


router.get("/alls/:CNE", async (req, res) => {
  try {
    const etudiants = await Etudiant.find({CNE:req.params.CNE})
      .populate({ path: 'Code_C', model: 'Classes', strictPopulate: false});
    const resultat = [];
    for (const etudiant of etudiants) {
      const id_F = etudiant.Code_C.Code_F;
      const filiere = await Filiere.findOne({ _id: id_F }).select({ Nom_F: 1 });
      if (filiere) {
        const etud = { element: etudiant, nom_f: filiere.Nom_F };
        resultat.push(etud);
      }
    }
    res.send(resultat);
  } catch (err) {
    console.error(err);
    res.send("erreur");
  }
}); 


//*****************get par nom et prenom ************* 
router.get("/alls/:Nom/:Prenom", async (req, res) => {
  try {
    const etudiants = await Etudiant.find({Nom:req.params.Nom ,Prenom:req.params.Prenom})
      .populate({ path: 'Code_C', model: 'classes', strictPopulate: false});
    const resultat = [];
    for (const etudiant of etudiants) {
      const id_F = etudiant.Code_C.Code_F;
      const filiere = await Filiere.findOne({ _id: id_F }).select({ Nom_F: 1 });
      if (filiere) {
        const etud = { element: etudiant, nom_f: filiere.Nom_F };
        resultat.push(etud);
      }
    }
    res.send(resultat);
  } catch (err) {
    console.error(err);
    res.send("erreur");
  }
}); 







router.get("/search/:Nom_C", async (req, res) => {
  try { 
  
    const etudiants = await Etudiant.find({}).populate({
      path: 'Code_C',
      model: 'Classes',
      options: { strictPopulate: false }
    }); 
    // res.send(etudiants[0].Code_C.Code_C);
     const resultat = [];
     for (const etudiant of etudiants) { 
      if (etudiant.Code_C.Nom_C === req.params.Nom_C) { 
        const filiere = await Filiere.findOne({ _id: etudiant.Code_C.Code_F }).select({ Nom_F: 1 });
               if (filiere) {
               const etud = { element: etudiant, nom_f: filiere.Nom_F };
        resultat.push(etud);
       }
     }}
    res.send(resultat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
router.put("/:id", async (req, res) => { 
  try {
    const classe = await getrplacingid(req.body.Nom_C);
    const student = {
    'CNE' : req.body.CNE,
    'Nom' : req.body.Nom,
    'Prenom' : req.body.Prenom,
    'Date_N':req.body.Date_N,
    'Code_C':classe._id, 
   'Type_Bac':req.body.Type_Bac,  
   'Mention_Bac' :req.body.Mention_Bac, 
   'adresse':req.body.adresse, 
   'Academie': req.body.Academie, 
   'Lycee' : req.body.Lycee, 
   'Email' : req.body.Email,
   'Tele' : req.body.Tele,
    }
    await Etudiant.findOneAndUpdate({ _id: req.params.id }, student);
    const etudiant = await Etudiant.findOne({ _id: req.params.id });
    res.send(etudiant);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

async function getrplacingid(name) {
  const classe = await Classes.findOne({Nom_C:name});
  if (!classe) {
    throw new Error('Class not found');
  }
  return classe;
} 



// router.delete('/:id', async (req, res, next) => { 

//    const etudiant = await Etudiant.findByIdAndDelete(req.params.id);  
//    console.log("dqfs");
  

// }); 



router.delete('/:id', async (req, res, next) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Etudiant not found" });
    }
    await etudiant.remove(); // This triggers the pre('remove') middleware function
    return res.status(200).json({ message: "Etudiant deleted successfully" });
  } catch (err) {
    return next(err);
  }
});

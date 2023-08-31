const express = require("express");
const router = express.Router();
const User = require('../models/user');


router.post("/", (req, res) => { 
  console.log(req.body)
  User.create(req.body)
    .then((filiere) => {
     res.send(filiere);
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});
router.post("/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send(true);
  } else {
    res.send(false);
  }
});





module.exports=router;
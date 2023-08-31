const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const cors = require('cors');
// const routes = require("./routes/module_api.js");
const matiereroutes = require("./routes/matiere_api.js");
const epreuveroutes = require("./routes/epreuve_api.js"); 
const notesroutes = require("./routes/note_api.js"); 
const etudiantroutes = require("./routes/etudiant_api.js"); 
const filiereroutes=require("./routes/filiere_api.js");  
const classesroutes=require("./routes/classe_api.js");  
const adminroutes=require("./routes/user_api.js"); 
const Moymatiereroutes=require("./routes/obtenir_matiere_api.js"); 
const resultatroutes=require("./routes/resultat_api.js"); 
const Moymoduleroutes =require("./routes/obtenir_module_api.js"); 
const semestreroutes=require ("./routes/semestre_api.js");
mongoose.set('strictQuery', true);  
const moduleroutes=require("./routes/module_api.js"); 
 mongoose.connect('mongodb://127.0.0.1:27017/RestApi')
  .then(() => console.log('Connected!'))
.catch((e)=>console.error('failed !' + e ));
// set up express app
const app = express();     
const corsOptions = {
  origin: 'http://localhost:3001/'
};

app.use(cors());
app.use(express.json()); 
app.use('/epreuve',epreuveroutes) 
app.use('/etudiants',etudiantroutes) 
app.use('/filieres',filiereroutes) 
app.use('/classes',classesroutes) 
app.use('/module',moduleroutes) 
app.use('/matieres',matiereroutes) 
app.use('/notes',notesroutes) 
app.use('/moyenne_matiere',Moymatiereroutes)  
 app.use('/moyenne_module',Moymoduleroutes)  
 app.use('/resultat',resultatroutes)
app.use('/semestre',semestreroutes) 
app.use('/admin',adminroutes)
// app.get ('/',(req,res) => { 
// res.send ('hello dans my Api3 ');
// }); 

// app.get ('/yassine',(req,res) => { 
//   res.send (['yassine', 'ahmed','brahim']);
//   }); 

//   app.get ('/etudient/',(req,res) => { 
//     res.send ('recherche des etudients :  ' ); 

//     });  
   
//   app.get ('/etudient/:class',(req,res) => { 
//     res.send ('etudient de class : ' + req.params.class); 

//     });  

//     app.get ('/etudient/:class/:id',(req,res) => { 
//       res.send ('etudient de class : ' + req.params.class + 'avec id : ' + req.params.id); 
      
//       });  

//       app.get ('/etud/:id',(req,res) => { 
//         res.send ( req.query.class ); 
        
//         }); 
  
//         app.get ('/etudient1/:id',(req,res) => { 
//         const findetud=etude.find(element => element.id==req.params.id)  
//         if (!findetud) 
//         { 
//           res.end('id nexiste pas');
//         }
//           res.send(findetud);
//           }); 



// middleware



// app.use('./routes/module_api.js',routes);
// app.use('./routes/matiere_api.js',matiereroutes); 
// app.use('./routes/etudiant_api.js',etudiantroutes); 
// app.use('./routes/note_api.js',noteroutes); 



// listen for requests
const port =process.env.port ||3002;
app.listen(port, () => {
  console.log("App working on port " +port+ "........");
});
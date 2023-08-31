import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View4() {
  const [filiere, setFiliere] = useState({
    id:"",
    LibelleMatiere:"",
     
    coefficient:"",
    VH_CM:"",
     
    VH_TD:"",
    VH_TP:"",
    Nb_epreuve:"",
    LibelleModule:"",
 
  });

  const { _id } = useParams();

  useEffect(() => {
    if (!_id) return;
    const fetchFiliere = async () => {
      const { data } = await axios.get(`http://localhost:3002/matieres/${_id}`);
      setFiliere(data);
    };
    fetchFiliere();
  }, [_id]);




  return (
    <>
    
    <Form>
       
      
        
       <input
         type="text"
         placeholder="Nom_matiere"
         autoFocus
         name="LibelleMatiere"
         value={filiere?.LibelleMatiere}
        
         required
       />
      
      <input
         type="text"
         placeholder="VH_CM"
         autoFocus
         name="VH_CM"
         value={filiere?.VH_CM}
       
         required 
         enable
       />
       <input
         type="text"
         placeholder="VH_TD"
         autoFocus
         name="VH_TD"
         value={filiere?.VH_TD}
       
         required 
         enable
       />
       <input
         type="text"
         placeholder="VH_TP"
         autoFocus
         name="VH_TP"
         value={filiere?.VH_TP}
       
         required 
         enable
       />
        <input
         type="text"
         placeholder="coefficient"
         autoFocus
         name="coefficient"
         value={filiere?.coefficient}
       
         required
       />
       <input
         type="text"
         placeholder="Nb_epreuve"
         autoFocus
         name="Nb_epreuve"
         value={filiere?.Nb_epreuve}
       
         required 
         enable
       />
        <input
         type="text"
         placeholder="Nom_module"
         autoFocus
         name="Nom_module"
         value={filiere?.module?.LibelleModule}
        
         required 
       /> 
       <Button type="submit" variant="primary"  className="hj">
         Ajouter
       </Button>
      </Form>
    </>
  );
}

export default View4;


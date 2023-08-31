import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View3() {
  const [filiere, setFiliere] = useState({
    id:"",
    libelle:"",
     
    coefficient:"",
    semestre:"",
     
    classe:"",
    VH_global:"",
    Nb_matiere:"",
  });

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchFiliere = async () => {
      const { data } = await axios.get(`http://localhost:3002/filieres/fil/${id}`);
      setFiliere(data);
    };
    fetchFiliere();
  }, [id]);




  return (
    <>
    
    <Form>
       
      
        
       <input
         type="text"
         placeholder="libelle"
         autoFocus
         name="libelle"
         value={filiere.libelle}
        
         required
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
         placeholder="semestre"
         autoFocus
         name="semestre"
         value={filiere?.semestre}
        
         required 
       /> 
       <input
         type="text"
         placeholder="classe"
         autoFocus
         name="classe"
         value={filiere?.classe}
       
         required 
         enable
       />
       <Button type="submit" variant="primary"  className="hj">
         Ajouter
       </Button>
      </Form>
    </>
  );
}

export default View3;


import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View5() {
  const [filiere, setFiliere] = useState({
    _id:"",
    Nom_c:"",
     
    Nom_F:"",
    nbr_etud:"",
     
    nbr_modules:"",
 
  });

  const { _id } = useParams();

  useEffect(() => {
    if (!_id) return;
    const fetchFiliere = async () => {
      const { data } = await axios.get(`http://localhost:3002/classes/${_id}`);
      setFiliere(data);
    };
    fetchFiliere();
  }, [_id]);




 



  return (
    <>
    
    <Form>
       
      
        
       <input
         type="text"
         placeholder="Nom_Classe"
         autoFocus
         name="Nom_c"
         value={filiere?.classes_data?.Nom_c}
        
         required
       />
      
      <input
         type="text"
         placeholder="Nom_Filiere"
         autoFocus
         name="Nom_F"
         value={filiere?.filiere?.Nom_F}
       
         required 
         enable
       />
       <input
         type="text"
         placeholder="Nbr_Etudiants"
         autoFocus
         name="nbr_etud"
         value={filiere?.classes_data?.nbr_etud}
       
         required 
         enable
       />
       <input
         type="text"
         placeholder="Nbr_Modules"
         autoFocus
         name="nbr_modules"
         value={filiere?.classes_data?.nbr_modules}
       
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

export default View5;


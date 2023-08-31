import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View() {

  
  
  const [element, setElement] = useState({

    element: [],
  nom_f: ""
   


  });


  
  const { _id } = useParams();
 
  useEffect(() => {
    if (!_id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/etudiants/alls_id/${_id}`);
      setElement(data);
    };
    fetchPost();
  }, [_id]);




  return (
    <>
      
      <Form >
      <input
          type="text"
          placeholder="ID"
          autoFocus
          className="oppp"
          name="_id"
          value={element?.element[0]?._id}
        
          required 
        />
        <br />
        
        <input
          type="text"
          placeholder="BJ345678"
          autoFocus
          name="CNE"
          value={element?.element[0]?.CNE}
        
          required
        />
        <input
          type="text"
          placeholder="Nom"
          autoFocus
          name="Nom"
          value={element?.element[0]?.Nom}
       
          required
        />
        <input
          type="text"
          placeholder="Ahmed"
          autoFocus
          name="Prenom"
          value={element?.element[0]?.Prenom}
         
          required 
        /> 
        <input
          type="date"
          
          autoFocus
          name="Date_N"
          value={element?.element[0]?.Date_N}
        
          required 
          enable
        />
         <input
          type="text"
          placeholder="Exemple: Sc Maths..."
          autoFocus
          name="Type_Bac"
          value={element?.element[0]?.Type_Bac}
        
          required 
          enable
        />
         <input
          type="text"
          placeholder="Exemple: Bien..."
          autoFocus
          name="Mention_Bac"
          value={element?.element[0]?.Mention_Bac}
         
          required 
          enable
        />
         <input
          type="text"
          placeholder="Academie"
          autoFocus
          name="Academie"
          value={element?.element[0]?.Academie}
       
          required 
          enable
        />
         <input
          type="text"
          placeholder="Lycee"
          autoFocus
          name="Lycee"
          value={element?.element[0]?.Lycee}
       
          required 
          enable
        />
         <input
          type="text"
          placeholder="Nom Du Classe"
          autoFocus
          name="Nom_C"
          value={element?.element[0]?.Code_C?.Nom_C}
      
          required 
          enable
        />
         <input
          type="text"
          placeholder="Nom Du Filiere"
          autoFocus
          name="nom_f"
          value={element?.nom_f}
          required 
          enable
        />
         <input
          type="text"
          placeholder="adresse"
          autoFocus
          name="adresse"
          value={element?.element[0]?.adresse}
      
          required 
          enable
        />
         <input
          type="email"
          placeholder="user@gmail.com"
          autoFocus
          name="Email"
          value={element?.element[0]?.Email}
       
          required 
          enable
        />
          <input
          type="text"
          placeholder="+212"
          autoFocus
          name="Tele"
          value={element?.element[0]?.Tele}
         
          required 
          enable
        />
        <Button type="submit" variant="primary"   className="hj">
          Ajouter
        </Button>
     
      </Form>
    </>
  );
}

export default View;
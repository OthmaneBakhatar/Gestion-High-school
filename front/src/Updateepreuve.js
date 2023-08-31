import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'; 

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Updateepreuve() { //
  const navigate = useNavigate();
  
  const [element, setElement] = useState({  
    
 
   
    
  });

  function handle(e) {
    const { name, value } = e.target;
    setElement(prevState => ({ ...prevState, [name]: value }));
    console.log(element);
  }
  
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/epreuve/id/${_id}`); //
      setElement(data);
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/epreuve/${_id}`, { //

    
    NomEpreuve:element?.NomEpreuve,
    DateEpreuve:element?.DateEpreuve,
    HeureEpreuve:element?.HeureEpreuve,
    LieuEpreuve:element?.LieuEpreuve,
    NatureEpreuve :element?.NatureEpreuve,
    Code_mat:element?.Code_mat

    }).then(() => {
      return navigate("/Tabepreuve");
    });
  };

  return (
    <>
      <Form>
       
      
        
        <input
          type="text"
          placeholder="NomEpreuve"
          autoFocus
          name="NomEpreuve"
          value={element?.NomEpreuve}
          onChange={handle}
          required
        />
      
        <input
          type="text"
          placeholder="DateEpreuve"
          autoFocus
          name="DateEpreuve"
          value={element?.DateEpreuve}
          onChange={handle}
          required 
        /> 
         <input
          type="text"
          placeholder="HeureEpreuve"
          autoFocus
          name="HeureEpreuve"
          value={element?.HeureEpreuve}
          onChange={handle}
          required 
        /> 
           <input
          type="text"
          placeholder="NatureEpreuve"
          autoFocus
          name="NatureEpreuve"
          value={element?.NatureEpreuve}
          onChange={handle}
          required 
        /> 
            <input
          type="text"
          placeholder="LieuEpreuve"
          autoFocus
          name="LieuEpreuve"
          value={element?.LieuEpreuve}
          onChange={handle}
          required 
        /> 
   <input
          type="text"
          placeholder="matiere"
          autoFocus
          name="Code_mat"
          value={element?.Code_mat?.LibelleMatiere}
          onChange={handle}
          required 
        /> 
        <Button type="submit"   id="env" variant="primary" onClick={submitUser} className="hj">
        modifier
        </Button>
      </Form>
    </>
  );
}

export default Updateepreuve;
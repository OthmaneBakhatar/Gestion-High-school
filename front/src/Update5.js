import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'; 

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update5() {
  const navigate = useNavigate();
  
  const [filiere, setFiliere] = useState({ 
   filieres:'' ,
   classes_data :''
  });

  function handle(e) {
    const { name, value } = e.target;
    setFiliere(prevState => ({ ...prevState, [name]: value }));
    console.log(filiere);
  }
  
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/classes/${_id}`); 
      // console.log(data?.filieres[0]?.classes_data[0]?.Nom_c , data?.filieres[0]?.filiere?.Nom_F) 
      console.log(data[0].classes_data[0].Nom_c)
      console.log(data[0].filiere.Nom_F)
      // filiere?.filieres[0]?.classes_data[0]?.Nom_c
      // filiere?.filieres[0]?.filiere?.Nom_F
      setFiliere({filieres:data[0].filiere.Nom_F,
                  classes_data :data[0].classes_data[0].Nom_c});
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/classes/${_id}`, {
     
      Nom_C:filiere.classes_data,
      Nom_F: filiere.filieres,
      

    }).then(() => {
      return navigate("/tabb2");
    });
  };

  return (
    <>
      <Form>
       
      {console.log(filiere)}
        
        <input
          type="text"
          placeholder="Nom_Classe"
          autoFocus
          name="filieres"
          value={filiere.filieres}
          onChange={handle}
          required
        />
      
        <input
          type="text"
          placeholder="Nom_Filiere"
          autoFocus
          name="classes_data"
          value={filiere.classes_data}
          onChange={handle}
          required 
        /> 
       
  
        <Button type="submit"  id="env" variant="primary" onClick={submitUser} className="hj">
        modifier
        </Button>
      </Form>
    </>
  );
}

export default Update5;
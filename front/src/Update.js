import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; 

import { useNavigate, useParams } from 'react-router-dom'; 
import './up.css';

function Update() {
  const navigate = useNavigate();
  
  const [element, setElement] = useState({
    element: [],
    Nom_C: ""
  });

  // function handle(e) {
  //   const { name, value } = e.target;
  //   setElement(prevState => ({
  //     ...prevState,
  //     element: [
  //       {
  //         ...prevState.element[0],
  //         [name]: value ,
  //         // Nom_C : { 
  //         //   ...prevState.element[0].Code_C, 
  //         //    [name]: value 
  //         // }
  //       }
  //     ]
  //   }));
  //   console.log(element);
  // }
  function handle(e) {
    const { name, value } = e.target;
    if (name === "Nom_C") {
      setElement(prevState => ({
        ...prevState,
        element: [
          {
            ...prevState.element[0],
            Code_C: {
              ...prevState.element[0].Code_C,
              Nom_C: value
            }
          }
        ]
      }));
    } else {
      setElement(prevState => ({
        ...prevState,
        element: [
          {
            ...prevState.element[0],
            [name]: value
          }
        ]
      }));
    }
  }
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/etudiants/alls_id/${_id}`);
      setElement(data);
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/etudiants/${_id}`, {
      _id: element?.element[0]?._id,
      CNE: element?.element[0]?.CNE,
      Nom: element?.element[0]?.Nom,
      Prenom: element?.element[0]?.Prenom,
      Date_N: element?.element[0]?.Date_N,
      Type_Bac: element?.element[0]?.Type_Bac,
      Mention_Bac: element?.element[0]?.Mention_Bac,
      Academie: element?.element[0]?.Academie,
      Lycee: element?.element[0]?.Lycee,
      Nom_C: element?.element[0]?.Code_C.Nom_C,
      adresse: element?.element[0]?.adresse,
      Email: element?.element[0]?.Email,
      Tele: element?.element[0]?.Tele,
    }).then(() => {
      return navigate("/Tab");
    });
  };

  return (
    <> 
    <html> 
      <head>
      <link rel="stylesheet" href="up.css"/>
      </head>
   
      <Form>
     
        <input
          type="text"
          placeholder="ID"
          autoFocus
          className="oppp"
          name="_id"
          value={element?.element[0]?._id}
          onChange={handle}
          required 
          disabled
        />
        <br />
        
        <input
          type="text"
          placeholder="BJ345678"
          autoFocus
          name="CNE"
          value={element?.element[0]?.CNE}
          onChange={handle}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          autoFocus
          name="Nom"
          value={element?.element[0]?.Nom}
          onChange={handle}
          required
        />
        <input
          type="text"
          placeholder="Ahmed"
          autoFocus
          name="Prenom"
          value={element?.element[0]?.Prenom}
          onChange={handle}
          required 
        /> 
        <input
          type="date"
          
          autoFocus
          name="Date_N"
          value={element?.element[0]?.Date_N}
          onChange={handle}
          required 
          enable
        />
         <input
          type="text"
          placeholder="Exemple: Sc Maths..."
          autoFocus
          name="Type_Bac"
          value={element?.element[0]?.Type_Bac}
          onChange={handle}
          required 
          enable
        />
         <input
          type="text"
          placeholder="Exemple: Bien..."
          autoFocus
          name="Mention_Bac"
          value={element?.element[0]?.Mention_Bac}
          onChange={handle}
          required 
          enable
        />
         <input
          type="text"
          placeholder="Academie"
          autoFocus
          name="Academie"
          value={element?.element[0]?.Academie}
          onChange={handle}
          required 
          enable
        />
         <input
          type="text"
          placeholder="Lycee"
          autoFocus
          name="Lycee"
          value={element?.element[0]?.Lycee}
          onChange={handle}
          required 
          enable
        />
         <input
          type="text"
          placeholder="Nom Du Classe"
          autoFocus
          name="Nom_C"
          value={element?.element[0]?.Code_C?.Nom_C}
          onChange={handle}
          required 
          enable
        />
        
         <input
          type="text"
          placeholder="adresse"
          autoFocus
          name="adresse"
          value={element?.element[0]?.adresse}
          onChange={handle}
          required 
          enable
        />
         <input
          type="email"
          placeholder="user@gmail.com"
          autoFocus
          name="Email"
          value={element?.element[0]?.Email}
          onChange={handle}
          required 
          enable
        />
          <input
          type="text"
          placeholder="+212"
          autoFocus
          name="Tele"
          value={element?.element[0]?.Tele}
          onChange={handle}
          required 
          enable
        /> <br></br><br></br><br></br><br></br>
          <Button type="submit"  id="env" variant="primary" onClick={submitUser} className="hj">
          modifier
        </Button>
      </Form>  
   
      </html>
    </>
  );
}

export default Update;
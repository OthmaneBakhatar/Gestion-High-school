import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'; 

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Updatenote() { //
  const navigate = useNavigate();
  
  const [element, setElement] = useState({  
    
  

 Code_E:"", 
 Code_Et:"", 
 Note :""
    
  });

  function handle(e) {
    const { name, value } = e.target;
    setElement(prevState => ({ ...prevState, [name]: value }));
    console.log(element);
  }
  
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/notes/${_id}`); // 
      {console.log(data[0].Code_E.NomEpreuve)}
      setElement({Code_E : data[0].Code_E.NomEpreuve, 
        Code_Et :data[0].Code_Et.CNE , 
      Note:data[0].Note.$numberDecimal} );
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/notes/${_id}`, { //
    Code_E:element.Code_E,
    Code_Et:element.Code_Et,
    Note:element.Note
   

    }).then(() => {
      return navigate("/Tabnote");
    });
  };

  return (
    <>
      <Form>
       
      
        
        <input
          type="text"
          placeholder="CNE"
          autoFocus
          name="Code_Et"
          value={element.Code_Et}
          onChange={handle}
          required
        />
      
        <input
          type="text"
          placeholder="Nom"
          autoFocus
          name="Code_E"
          value={element.Code_E}
          onChange={handle}
          required 
        /> 
         <input
          type="text"
          placeholder="Note"
          autoFocus
          name="Note"
          value={element.Note}
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

export default Updatenote;
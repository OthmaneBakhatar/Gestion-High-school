import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouterepreuve() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  
  const [NomEpreuve, setNomEpreuve] = useState()
  const [DateEpreuve, setDateEpreuve] = useState()
  const [HeureEpreuve, setHeureEpreuve] = useState()
  const [LieuEpreuve, setLieuEpreuve] = useState()
  const [NatureEpreuve, setNatureEpreuve] = useState()
  
  const [LibelleMatiere, set] = useState()
  
   
  const [count, setCount] = useState(0);
   
  const [element, setElement] = useState({ 
   
    NomEpreuve:"",
    DateEpreuve:"",
    HeureEpreuve:"",
    LieuEpreuve:"",
    NatureEpreuve:"",
    LibelleMatiere:"",
    
  });

  function handle(e) {
    const newdata = { ...element}
    newdata[e.target.name]=e.target.value
    setElement(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...element}
    newdata[e.target.name]=e.target.value
 
    setElement(newdata)
 console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {

    
    e.preventDefault();
    setShow(false);
    
    await axios.post('http://localhost:3002/epreuve/',{
      
  
    NomEpreuve:element?.NomEpreuve,
    DateEpreuve:element?.DateEpreuve,
    HeureEpreuve:element?.HeureEpreuve,
    LieuEpreuve:element?.LieuEpreuve,
    NatureEpreuve:element?.NatureEpreuve,
     LibelleMatiere:element?.Code_mat,
    

     
    })
    .then((result) => {
      console.log(result.data);
     
      setCount(count + 1);
      alert(`Data has been added (${count + 1}) please refresh your page!`);
      

    });

   
   
  };

  return (
    <>
      <button className='aj' onClick={handleShow}>Ajouter</button>
     
      <Form >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter de nouvelle ligne</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="NOM EPREUVE"
                autoFocus
                name='NomEpreuve'
                id="cc"
                value={element?.NomEpreuve} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
          <Form.Group className="mb-3" >
              <Form.Control
                type="date"
                placeholder="date"
                autoFocus
                name='DateEpreuve'
                id="cc"
                value={element?.DateEpreuve} onChange={(e)=>handle(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="time"
                placeholder="heure"
                autoFocus
                name='HeureEpreuve'
                id="cc"
                value={element?.HeureEpreuve} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="lieu"
                autoFocus
                name='LieuEpreuve'
                id="cc"
                value={element?.LieuEpreuve} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="nature d'epreuve"
                autoFocus
                name='NatureEpreuve'
                id="cc"
                value={element?.NatureEpreuve} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="nom de matiere"
                autoFocus
                name='Code_mat'
                id="cc"
                value={element?.Code_mat?.LibelleMatiere} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary" className='hj' onClick={submitUser}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal> 
      </Form>
    </>
  );
}

export default Popupajouterepreuve;
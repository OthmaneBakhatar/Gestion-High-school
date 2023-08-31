import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouter2() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [_id, set_Id] = useState()
  const [Nom_F, setNom_F] = useState()
  
   
  const [desc, setDesc] = useState()
  
   
  const [classes, setClasses] = useState()
  const [total_etudiant, setTotal_etudiant] = useState()
  const [count, setCount] = useState(0);
   
  const [filiere, setFiliere] = useState({ 
    
    Nom_F:"",
    desc:"",
     
    
   
    
   
  });

  function handle(e) {
    const newdata = { ...filiere}
    newdata[e.target.name]=e.target.value
    setFiliere(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...filiere}
    newdata[e.target.name]=e.target.value
 
 setFiliere(newdata)
 console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {
    e.preventDefault();
    setShow(false);
    await axios.post('http://localhost:3002/filieres/',{    
      Nom_F:filiere?.Nom_F,
      desc:filiere?.desc,
    })
    .then((result) => {
      console.log(result.filiere);
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
                placeholder="Nom Du Filiere"
                autoFocus
                name='Nom_F'  
                id="cc"
                value={filiere?.Nom_F} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Description"
                autoFocus
                name='desc' 
                id="cc"
                value={filiere?.desc} onChange={(e)=>handlee(e)}
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

export default Popupajouter2;



//                 file 
// component 
// < search >   
// <add> 
// < tab de filiere > 

// habndle donne

import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouter3() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [_id, set_id] = useState()
  const [libelle, setLibelle] = useState()
  
   
  const [coefficient, setCoefficient] = useState()
  
   
  const [semestre, setSemestre] = useState()
  const [classe, setClasse] = useState()
  const [VH_global, setVH_global] = useState()
  const [Nb_matiere, setNb_matiere] = useState()
  const [count, setCount] = useState(0);
   
  const [module, setModule] = useState({ 
    
    
    LibelleModule:"",
    coefficient:"",
    semestre:"",  
    classe:"",
   
   
  });

  function handle(e) {
    const newdata = { ...module}
    newdata[e.target.name]=e.target.value
    setModule(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...module}
    newdata[e.target.name]=e.target.value
 
 setModule(newdata)
 console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {
    e.preventDefault();
    setShow(false);
    await axios.post('http://localhost:3002/module/',{
     
      
    LibelleModule:module?.LibelleModule,
      coefficient: module?.coefficient,
      semestre:module?.semestre,
      classe:module?.classe,
      
      
    })
    .then((result) => {
      console.log(result.module);
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
            <Modal.Title>Ajouter de nouvelle ligne2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="libelle"
                autoFocus
                name='LibelleModule' 
                id="cc"
                value={module?.LibelleModule} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="coefficient"
                autoFocus
                name='coefficient'
                id="cc"
                value={module?.coefficient} onChange={(e)=>handlee(e)}
                required
              />
           
            </Form.Group> 
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Nom classe"
                autoFocus
                name='classe'
                id="cc"
                value={module?.classe} onChange={(e)=>handlee(e)}
                required
              />
           
            </Form.Group> 
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="semestre"
                autoFocus
                name='semestre'
                id="cc"
                value={module?.semestre} onChange={(e)=>handlee(e)}
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

export default Popupajouter3;
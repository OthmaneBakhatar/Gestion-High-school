import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouter4() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [_id, set_Id] = useState()
  const [Nom_matiere, setNom_matiere] = useState()
  
   
  const [coefficient, setCoefficient] = useState()
  
   
  const [VH_CM, setVH_CM] = useState()
  const [VH_TD, setVH_TD] = useState()
  const [VH_TP, setVH_TP] = useState()
  const [Nb_epreuve, setNb_epreuve] = useState()
  const [Nom_module, setNom_module] = useState()
  const [count, setCount] = useState(0);
   
  const [matiere, setMatiere] = useState({ 
    
  
    LibelleMatiere:"",

    coefficient:"",
     module:"",
     VH_TD:"",
     VH_TP:"", 
     VH_CM:"",
    
   
  });

  function handle(e) {
    const newdata = { ...matiere}
    newdata[e.target.name]=e.target.value
    setMatiere(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...matiere}
    newdata[e.target.name]=e.target.value
 
 setMatiere(newdata)
 console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {
    e.preventDefault();
    setShow(false);
    await axios.post('http://localhost:3002/matieres/',{
      LibelleMatiere: matiere?.LibelleMatiere,
      coefficient: matiere?.coefficient,
      VH_TD: matiere?.VH_TD,
      VH_TP: matiere?.VH_TP, 
      VH_CM: matiere?.VH_CM, 
      module: matiere?.module,
    })
    .then((result) => {
      console.log(result.matiere);
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
                placeholder="libelle"
                autoFocus
                name='LibelleMatiere' 
                id="cc"
                value={matiere?.LibelleMatiere} onChange={(e)=>handlee(e)}
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
                value={matiere?.coefficient} onChange={(e)=>handlee(e)}
                required
              />
           
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Control
                type="text"
                placeholder="VH_TP"
                autoFocus
                name='VH_TP'
                id="cc"
                value={module?.VH_TP} onChange={(e)=>handlee(e)}
                required
              
                 ></Form.Control></Form.Group> 

            <Form.Group className="mb-3" >
            <Form.Control
                type="text"
                placeholder="VH_TD"
                autoFocus
                name='VH_TD'
                id="cc"
                value={module?.VH_TD} onChange={(e)=>handlee(e)}
                required
              
                 ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Control
                type="text"
                placeholder="VH_CM"
                autoFocus
                name='VH_CM'
                id="cc"
                value={module?.VH_CM} onChange={(e)=>handlee(e)}
                required
              
                 ></Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" >
            <Form.Control
                type="text"
                placeholder="module"
                autoFocus
                name='module'
                id="cc"
                value={module?.module} onChange={(e)=>handlee(e)}
                required
              
                 ></Form.Control>
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

export default Popupajouter4;
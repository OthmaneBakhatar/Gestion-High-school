import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouternote() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  const [Code_Et, setCode_Et] = useState()
  const [Code_E, setCode_E] = useState()
  const [Note, setNote] = useState()
  
   
  const [count, setCount] = useState(0);
   
  const [note, setnote] = useState({ 
Code_Et :"", 
Code_E:"", 
Note : ""
  });

  function handle(e) {
    const newdata = { ...note}
    newdata[e.target.name]=e.target.value
    setnote(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...note}
    newdata[e.target.name]=e.target.value
 
 setnote(newdata)
 console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {

    
    e.preventDefault();
    setShow(false);
    
    await axios.post('http://localhost:3002/notes/',{
        Code_Et:note.cne,
    Code_E:note.epreuve,
    Note:note.note,
    
     
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
                placeholder="CNE"
                autoFocus
                name='cne'
                id="cc"
                value={note.cne} onChange={(e)=>handle(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="number"
                placeholder="NOTE"
                autoFocus
                name='note'
                id="cc"
                value={note.note} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="NOM EPREUVE"
                autoFocus
                name='epreuve'
                id="cc"
                value={note.epreuve} onChange={(e)=>handlee(e)}
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

export default Popupajouternote;
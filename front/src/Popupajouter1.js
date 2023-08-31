import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import  './Search.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; 

function Popupajouter1() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  const [Nom, setNom] = useState()
  const [Prenom, setPrenom] = useState()
  const [Date_N, setDate_N] = useState()
  const [Type_Bac, setType_Bac] = useState()
  const [Mention_Bac, setMention_Bac] = useState()
  const [Academie, setAcademie] = useState()
  const [Lycee, setLycee] = useState()
  const [Nom_C, setNom_C] = useState()
  const [nom_f, setNom_f] = useState()
  const [adresse, setAdresse] = useState()
  const [Email, setEmail] = useState()
  const [Tele, setTele] = useState()
   
  const [CNE, setCNE] = useState()
  
   
  const [_id, set_Id] = useState()
  const [count, setCount] = useState(0);
   
  const [data, setData] = useState({ 
 
    data: [
      {
          _id: "",
          CNE: "",
          Nom: "",
          Prenom: "",
          Date_N: "",
          Type_Bac: "",
          Mention_Bac: "",
          Academie: "",
          Lycee: "",
          adresse: "",
          Code_C: {
              _id: "",
              Nom_C: "",
              Code_F: "",
          },
          Email: "",
          Tele:"" ,
          
      }
  ],
  nom_f: ""
  });

  
  function handle(e) {
    const newdata = { ...data}
    newdata[e.target.name]=e.target.value
    setData(newdata)
    console.log(newdata);
  };

  function handlee(e)  {
    const newdata = { ...data}
    newdata[e.target.name]=e.target.value
    setData(newdata)
    console.log(newdata);
   };

  let navigate=useNavigate();

  const submitUser = async (e) => {

    
    e.preventDefault();
    setShow(false);
    
    await axios.post('http://localhost:3002/etudiants/',{
      _id:data._id,
      CNE:data.CNE,
      Nom:data.Nom,
      Prenom:data.Prenom,
      Date_N:data.Date_N,
      Type_Bac:data.Type_Bac,
      Mention_Bac:data.Mention_Bac,
      Academie:data.Academie,
      Lycee:data.Lycee,
      Nom_C:data.Nom_C,
      adresse:data.adresse,
      Email:data.Email,
      Tele:data.Tele,
     
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
            <Form.Group  >
              <Form.Control
                type="text"
                placeholder="ID"
                autoFocus
                id="cc"
                disabled
                name='_id'
                value={_id} onChange={(e)=>handle(e)}
                required
              />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="BJ345678"
                autoFocus
                name='CNE' 
                id="cc"
                value={CNE} onChange={(e)=>handle(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="email"
                placeholder="Nom"
                autoFocus
                name='Nom' 
                id="cc"
                value={Nom} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Ahmed"
                autoFocus
                name='Prenom' 
                id="cc" 
                
                value={Prenom} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="date"
                id="cc"
                autoFocus
                name='Date_N'
                value={Date_N} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder=" Exemple: Sc Maths..."
                autoFocus
                name='Type_Bac' 
                id="cc"
                value={Type_Bac} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Exemple:Bien..."
                autoFocus
                name='Mention_Bac' 
                id="cc"
                value={Mention_Bac} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Academie"
                autoFocus
                name='Academie' 
                id="cc"
                value={Academie} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Lycee"
                autoFocus
                name='Lycee' 
                id="cc"
                value={Lycee} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="Nom Du Classe"
                autoFocus
                name='Nom_C' 
                id="cc"
                value={Nom_C} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
         
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="adresse"
                autoFocus
                name='adresse' 
                id="cc"
                value={adresse} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="email"
                placeholder="user@gmail.com"
                autoFocus
                name='Email' 
                id="cc"
                value={Email} onChange={(e)=>handlee(e)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder="+212"
                autoFocus
                name='Tele' 
                id="cc"
                value={Tele} onChange={(e)=>handlee(e)}
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

export default Popupajouter1;
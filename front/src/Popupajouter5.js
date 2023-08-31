// import React, { useState , useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import  './Search.css';
// import axios from 'axios';
// import { useNavigate} from 'react-router-dom'; 

// function Popupajouter5() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [_id, set_id] = useState()
//   const [Nom_c, setNom_c] = useState()
  
   
//   const [Nom_F, setNom_F] = useState()
  
   
//   const [nbr_etud, setNbr_etud] = useState()
//   const [nbr_modules, setNbr_modules] = useState()
 
//   const [count, setCount] = useState(0);
   
//   const [classe, setClasse] = useState({ 
    
//    filiere : { 
// Nom_F:""
//    } ,
//    classes_data:[ 
//     { 
//       Nom_c:""
//     }
 
//    ]
   
     
    
   
  
 
   
//   });

//   function handle(e) {
//     const newdata = { ...classe}
//     newdata[e.target.name]=e.target.value
//     setClasse(newdata)
//     console.log(newdata);
//   };

//   function handlee(e)  {
//     const newdata = { ...classe}
//     newdata[e.target.name]=e.target.value
 
//  setClasse(newdata)
//  console.log(newdata);
//    };

//   let navigate=useNavigate();

//   const submitUser = async (e) => {
//     e.preventDefault();
//     setShow(false);
//     await axios.post('http://localhost:3002/classes/',{
     
     
//       Nom_C:classe?.classes_data[0]?.Nom_c,
     
//       Nom_F:classe?.filiere?.Nom_F,
      
     
      
//     })
//     .then((result) => {
//       console.log(result.classe);
//       setCount(count + 1);
//       alert(`Data has been added (${count + 1}) please refresh your page!`);
//     });
//   };

//   return (
//     <>
//       <button className='aj' onClick={handleShow}>Ajouter</button>
     
//       <Form >
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Ajouter de nouvelle ligne</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
           
//             <Form.Group className="mb-3" >
//               <Form.Control
//                 type="text"
//                 placeholder="Nom_Classe"
//                 autoFocus
//                 name='Nom_c' 
//                 value={classe?.classes_data[0]?.Nom_c} onChange={(e)=>handlee(e)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" >
//               <Form.Control
//                 type="text"
//                 placeholder="Nom_Filiere"
//                 autoFocus
//                 name='Nom_F'
//                 value={classe?.filiere?.Nom_F} onChange={(e)=>handlee(e)}
//                 required
//               />
           
//             </Form.Group>
           
          

        
         
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button type='submit' variant="primary" className='hj' onClick={submitUser}>
//               Ajouter
//             </Button>
//           </Modal.Footer>
//         </Modal> 
//       </Form>
//     </>
//   );
// }

// export default Popupajouter5; 
//********************************************************************* */ 




import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Search.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Popupajouter5() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Nom_c, setNom_c] = useState('');
  const [Nom_F, setNom_F] = useState('');

  const [count, setCount] = useState(0);

  let navigate = useNavigate();

  const submitUser = async (e) => {
    e.preventDefault();
    setShow(false);
    await axios
      .post('http://localhost:3002/classes/', {
        Nom_C: Nom_c,
        Nom_F: Nom_F,
      })
      .then((result) => {
        console.log(result.classe);
        setCount(count + 1);
        alert(`Data has been added (${count + 1}) please refresh your page!`);
      });
  };

  return (
    <>
      <button className='aj' onClick={handleShow}>
        Ajouter
      </button>

      <Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter de nouvelle ligne</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Nom_Classe'
                autoFocus
                name='Nom_c'
                id="cc"
                value={Nom_c}
                onChange={(e) => setNom_c(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Nom_Filiere'
                autoFocus
                name='Nom_F'
                id="cc"
                value={Nom_F}
                onChange={(e) => setNom_F(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant='primary' className='hj' onClick={submitUser}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

export default Popupajouter5;
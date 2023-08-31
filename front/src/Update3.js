// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button'; 

// import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';



// function Update1() {

//   const navigate = useNavigate();
  
//   const [filiere, setFiliere] = useState({
//     _id: '',
//     Nom_F: '',
//     desc: '',
//     classes: '',
//     total_etudiant: ''
//   });

//   function handle(e) {
//     const newdata = { ...filiere };
//     newdata[e.target.name] = e.target.value;
//     setFiliere(newdata);
//     console.log(newdata);
//   }
  
//   const { _id } = useParams();
 
//   useEffect(() => {
//     const fetchPost = async () => {
//       const { data } = await axios.get(`http://localhost:3002/filieres/fil/${_id}`);
//       setFiliere(data);
//     };
//     fetchPost();
//   }, [_id]);


//   const submitUser = async (e) => {
//     e.preventDefault();
  

//     await axios.put(`http://localhost:3002/filieres/${_id}`, {
//         Nom_F: filiere?.filiere?.Nom_F,
//         desc: filiere?.filiere?.desc,
//         classes: filiere.classes,
//         total_etudiant: filiere.total_etudiant,
//     }).then((result) => {
//       console.log(result.filiere);
     
//       return navigate("/Tab");
     
//     });
//   };

//   return (
//     <>
   
//       <Form >
//         <input
//           type="text"
//           placeholder="ID"
//           autoFocus
//           className="oppp"
//           value={filiere?.filiere?._id}
//           onChange={handle}
//           required
//         />
//         <br />
//         <input
//           type="text"
//           placeholder="nom filiere"
//           autoFocus
//           name="Nom_F"
//           value={filiere?.filiere?.Nom_F}
//           onChange={handle}
//           required
//         />
//         <input
//           type="text"
//           placeholder="description"
//           autoFocus
//           name="desc"
//           value={filiere?.filiere?.desc}
//           onChange={handle}
//           required
//         />
//           <input
//           type="text"
//           placeholder="nombre classes"
//           autoFocus
//           name="classes"
//           value={filiere.classes}
//           onChange={handle}
//           required
//         />
//           <input
//           type="text"
//           placeholder="nombre etudiant"
//           autoFocus
//           name="total_etudiant"
//           value={filiere.total_etudiant}
//           onChange={handle}
//           required
//         />
//         <Button type="submit" variant="primary" onClick={submitUser}  className="hj">
//           Ajouter
//         </Button>
//       </Form>
//     </>
//   );
// }

// export default Update1;
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'; 

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update3() {
  const navigate = useNavigate();
  
  const [module, setModule] = useState({
    
   
  });

  function handle(e) {
    const { name, value } = e.target;
    setModule(prevState => ({ ...prevState, [name]: value }));
    console.log(module);
  }
  
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/module/${_id}`);
      setModule(data);
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/module/${_id}`, {
     
 
    LibelleModule:module?.LibelleModule,
    coefficient: module?.coefficient,
    semestre:module?.semestre,
    classe:module?.classe, 

    }).then(() => {
      return navigate("/Tabb4");
    });
  };

  return (
    <>
      <Form>
       
        <input
          type="text"
          placeholder="libelle"
          autoFocus
          name="LibelleModule"
          value={module?.LibelleModule}
          onChange={handle}
          required
        />
        <input
          type="text"
          placeholder="coefficient"
          autoFocus
          name="coefficient"
          value={module?.coefficient?.$numberDecimal}
          onChange={handle}
          required
        />
        <input
          type="text"
          placeholder="semestre"
          autoFocus
          name="semestre"
          value={module?.semestre}
          onChange={handle}
          required 
        /> 
        <input
          type="text"
          placeholder="classe"
          autoFocus
          name="classe"
          value={module?.classe}
          onChange={handle}
          required 
          enable
        />
        <Button type="submit"   id="env" variant="primary" onClick={submitUser} className="hj">
        modifier
        </Button>
      </Form>
    </>
  );
}

export default Update3;
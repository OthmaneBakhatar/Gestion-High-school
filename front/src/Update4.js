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

function Update4() {
  const navigate = useNavigate();
  
  const [filiere, setFiliere] = useState({
    
      module: [],
  
    
  });

  function handle(e) {
    const { name, value } = e.target;
    setFiliere(prevState => ({ ...prevState, [name]: value }));
    console.log(filiere);
  }
  
  const { _id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:3002/matieres/${_id}`);
      setFiliere(data);
    };
    fetchPost();
  }, [_id]);


  const submitUser = async (e) => {
    e.preventDefault();
  
    await axios.put(`http://localhost:3002/matieres/${_id}`, {
     

    LibelleMatiere:filiere?.LibelleMatiere,
    coefficient: filiere?.coefficient,
    VH_CM:filiere?.VH_CM,
    VH_TD:filiere?.VH_TD,
    VH_TP:filiere?.VH_TP,
    module:filiere?.module[0]?.LibelleModule,
  

    }).then(() => {
      return navigate("/tabb1");
    });
  };

  return (
    <>
      <Form>
       
      
        
        <input
          type="text"
          placeholder="Nom_matiere"
          autoFocus
          name="LibelleMatiere"
          value={filiere?.LibelleMatiere}
          onChange={handle}
          required
        />
      
        <input
          type="text"
          placeholder="VH_CM"
          autoFocus
          name="VH_CM"
          value={filiere?.VH_CM?.$numberDecimal}
          onChange={handle}
          required 
        /> 
        <input
          type="text"
          placeholder="VH_TD"
          autoFocus
          name="VH_TD"
          value={filiere?.VH_TD?.$numberDecimal}
          onChange={handle}
          required 
          enable
        />
          <input
          type="text"
          placeholder="VH_TP"
          autoFocus
          name="VH_TP"
          value={filiere?.VH_TP?.$numberDecimal}
          onChange={handle}
          required 
          enable
        />
  <input
          type="text"
          placeholder="coefficient"
          autoFocus
          name="coefficient"
          value={filiere?.coefficient?.$numberDecimal}
          onChange={handle}
          required
        />
        
        <input
          type="text"
          placeholder="Nom_module"
          autoFocus
          name="LibelleModule"
          value={filiere?.module[0]?.LibelleModule}
          onChange={handle}
          required 
          enable
        />
        <Button type="submit"  id="env" variant="primary" onClick={submitUser} className="hj">
        modifier
        </Button>
      </Form>
    </>
  );
}

export default Update4;
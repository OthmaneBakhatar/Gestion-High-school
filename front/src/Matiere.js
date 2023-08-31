
import {  BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'; 

import { useState,useEffect } from 'react';
import Matieretabret from './Matieretabret';

import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';




const Matiere =()=> {


const  [matiere,setMatiere] = useState([]);
const [isWaiting, setIsWaiting] = useState(true);
const [serverError, setServerError] = useState(null);




 


useEffect(() => {
    
        
    loadshitu();
  
  
  }, []);
  
  const loadshitu = async ()=> {
  
  const resultat = await axios.get('http://localhost:3002/matieres/');
  setMatiere(resultat.data);
  
  };

  const handleDelete = async id => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
        await axios.delete(`http://localhost:3002/matieres/${id}`);
        loadshitu();
    }
   

  };

    return(
        
        <Matieretabret element={matiere}    deleteaction={handleDelete} isWaiting  ={isWaiting}  serverError  ={serverError}   />

    );
    }
export default Matiere;


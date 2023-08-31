
import {  BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'; 

import { useState,useEffect } from 'react';
import Tabret1 from './Tabret1';

import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';




const Tabb1 =()=> {

  





const  [filiere,setFiliere ] = useState([]);
const [isWaiting, setIsWaiting] = useState(true);
const [serverError, setServerError] = useState(null);




 


useEffect(() => {
    
        
    loadshitu();
  
  
  }, []);
  
  const loadshitu = async ()=> {

  const resultat = await axios.get('http://localhost:3002/filieres/');
  setFiliere(resultat.data);
  };

  const handleDelete = async id => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
        await axios.delete(`http://localhost:3002/filieres/${id}`);
        loadshitu();
    }
   

  };

    return(
        
        <Tabret1  filiere={filiere}    deleteaction={handleDelete} isWaiting  ={isWaiting}  serverError  ={serverError}   />

    );
}
export default Tabb1;


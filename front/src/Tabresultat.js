import {  BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'; 

import { useState,useEffect } from 'react';
import Tabretresultat from './Tabretresultat'; /// 

import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';




const Tabresultattt =()=> {


const  [resultat,setresultat] = useState([]); 
const [isWaiting, setIsWaiting] = useState(true);
const [serverError, setServerError] = useState(null);




 


useEffect(() => {
    
        
    loadshitu();
  
  
  }, []);
  
  const loadshitu = async ()=> {
  
  const resultat = await axios.get('http://localhost:3002/moyenne_matiere/notes/aa'); //** */
  setresultat(resultat.data); 
  
  };

  const handleDelete = async id => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
        await axios.delete(`http://localhost:3002/obtenirmatiere/${id}`);
        loadshitu();
    }
   

  };

    return(
        
        <Tabretresultat  element={resultat}    deleteaction={handleDelete} isWaiting  ={isWaiting}  serverError  ={serverError}   />

    ); 
    }
export default Tabresultattt;

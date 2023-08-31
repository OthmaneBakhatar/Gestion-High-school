import {  BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'; 

import { useState,useEffect } from 'react';
import Tabretepreuve from './Tabretepreuve'; /// 

import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';




const Tabepreuve =()=> {


const  [epreuve,setepreuve] = useState([]); 
const [isWaiting, setIsWaiting] = useState(true);
const [serverError, setServerError] = useState(null);




 


useEffect(() => {
    
        
    loadshitu();
  
  
  }, []);
  
  const loadshitu = async ()=> {
  
  const resultat = await axios.get('http://localhost:3002/epreuve/all'); //** */
  setepreuve(resultat.data); 
  
  };

  const handleDelete = async id => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
        await axios.delete(`http://localhost:3002/epreuve/${id}`);
        loadshitu();
    }
   

  };

    return(
        
        <Tabretepreuve  element={epreuve}    deleteaction={handleDelete} isWaiting  ={isWaiting}  serverError  ={serverError}   />

    ); 
    }
export default Tabepreuve;

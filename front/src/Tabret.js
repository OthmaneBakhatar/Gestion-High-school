import Tab from './Tab';



import Update from'./Update';

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';
import './Search.css';
import Popupajouter1 from './Popupajouter1';

import './tabret.css';
import { Link } from 'react-router-dom';
const Tabret=({element,isWaiting,deleteaction,serverError})=> {

  const  [search,setSearch ] = useState('');
  console.log(search);
 return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link"  id="bb"> <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter1 />
<div className='ta'> <strong> Table Des Etudiants!</strong></div>

</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >Operation</th>
<th >CNE</th>
<th >Nom</th>
<th >Prenom</th>
<th >Date Naissance</th>
<th >Type Bac</th>
<th >Mention bac</th>
<th >Academie</th>
<th >Lycee</th> 
<th >Classe</th> 
<th >Filiere</th>
<th >Adresse</th>
<th >Email</th>
<th >Telephone</th>

</tr>
{element && element.filter((element)=>{ 
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || element.element.CNE.toLowerCase().includes(lowerCaseSearch))||(!lowerCaseSearch || element.element.Nom.toLowerCase().includes(lowerCaseSearch)|| element.element.Code_C.Nom_C.toLowerCase().includes(lowerCaseSearch));
}).map((element,index) => (
  <tr className='headerr' key={index}>
    <td>
    
      <Link to={`/ui/${element?.element?._id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(element?.element?._id) }}><TfiTrash /></button>
    </td>
   
    <td >{element?.element?.CNE}</td>
    
    <td>{element?.element?.Nom}</td>
    <td >{element?.element?.Prenom}</td>
    <td >{element?.element?.Date_N}</td>
    <td >{element?.element?.Type_Bac}</td>
    <td >{element?.element?.Mention_Bac}</td>
    <td >{element?.element?.Academie}</td> 
    <td >{element?.element?.Lycee}</td>  
    <td >{element?.element?.Code_C?.Nom_C}</td> 
    <td >{element?.nom_f}</td> 
    <td >{element?.element?.adresse}</td>
    <td >{element?.element?.Email}</td>
    <td >{element?.element?.Tele}</td>
  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Tabret;
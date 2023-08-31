import Tabnote from './Tabnote';

import Searchnote from './Searchnote'; 

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb'; 

import Updatenote from'./Updatenote';

import { useParams } from 'react-router-dom';

import Popupajouternote from './Popupajouternote';

import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';
import './tabret.css';
import { Link } from 'react-router-dom';
const Tabretnote=({element,isWaiting,deleteaction,serverError})=> { // changer nom
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link" id='bb' > <SlMagnifier className='t'/> </Link>
 

</div>  
<div className='ta'> <strong> Table Des Notes!</strong></div>

<Popupajouternote />



</div>
<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >operation</th> 

<th >cne</th>
<th >Nom</th>
<th >Prenom</th>
<th >classe</th>
<th >filiere</th>
<th >matiere</th> 
<th >NOte</th>



</tr>
{element && element.filter((element)=>{ 
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || element?.Code_Et?.CNE.toLowerCase().includes(lowerCaseSearch) || element?.Code_Et?.Nom.toLowerCase().includes(lowerCaseSearch) ||  element?.Code_Et?.Prenom.toLowerCase().includes(lowerCaseSearch)|| element?.Code_Et?.Nom.toLowerCase().includes(lowerCaseSearch) ||  element?.Code_E?.Code_mat?.LibelleMatiere.toLowerCase().includes(lowerCaseSearch))  ;
}).map((element,index) => (
  <tr className='headerr' key={index}>
    <td>
     
      <Link to={`/uiii/${element?._id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(element?._id) }}><TfiTrash /></button>
    </td>
    

    <td >{element?.Code_Et?.CNE}</td>
    <td>{element?.Code_Et?.Nom}</td>
    <td >{element?.Code_Et?.Prenom}</td>
    <td >{element?.Code_Et?.Code_C?.Nom_C}</td>
    <td >{element?.Code_Et?.Code_C?.Code_F?.Nom_F}</td>
    <td >{element?.Code_E?.Code_mat?.LibelleMatiere}</td> 
    <td >{element?.Note?.$numberDecimal}</td>
    
  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Tabretnote; // changer nom
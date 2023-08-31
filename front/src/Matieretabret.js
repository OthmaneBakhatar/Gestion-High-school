import Matiere from './Matiere';
import { useState } from 'react';
import SearchMatiere from './SearchMatiere';

import Update4 from'./Update4';
import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';

import Popupajouter4 from './Popupajouter4'; 
import { SlMagnifier } from 'react-icons/sl';

import './tabret.css';
import { Link } from 'react-router-dom';
const Matieretabret=({element,isWaiting,deleteaction,serverError})=> { 
  const  [search,setSearch ] = useState('');
 return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' placeholder='Search...' onChange={(e)=>setSearch(e.target.value)} />
 <Link to="/C" className="nav-link" id='bb' > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter4 />
<div className='ta'> <strong> Table Des Matieres!</strong></div>

</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >Operation</th>

<th >Nom Matiere</th>
<th >CM</th>
<th >TD</th>
<th >TP</th>
<th >Coefficient</th>
<th >Nb_Epreuve</th>
<th >Nom Module</th>

</tr>
{element && element.filter((element)=>{ 
   
    const lowerCaseSearch = search.toLowerCase();
  
    return (!lowerCaseSearch || element?.LibelleMatiere.toLowerCase().includes(lowerCaseSearch)|| element?.module[0]?.LibelleModule.toLowerCase().includes(lowerCaseSearch));
  }).map((element,index) => (
  <tr className='headerr' key={index}>
    <td>
      
      <Link to={`/uioo/${element?._id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(element?._id) }}><TfiTrash /></button>
    </td>
   
  
    
    <td>{element?.LibelleMatiere}</td>
    <td >{element?.VH_CM?.$numberDecimal}</td>
    <td >{element?.VH_TD?.$numberDecimal}</td>
    <td >{element?.VH_TP?.$numberDecimal}</td>
    <td >{element?.coefficient?.$numberDecimal}</td>
    <td >{element?.count}</td> 
    <td >{element?.module[0]?.LibelleModule}</td> 
   
  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Matieretabret;
import Tabepreuve from './Tabepreuve';

import Searchepreuve from './Searchepreuve'; 

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';

import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';
import Popupajouterepreuve from './Popupajouterepreuve';

import './tabret.css';
import { Link } from 'react-router-dom';
const Tabretepreuve=({element,isWaiting,deleteaction,serverError})=> { // changer nom
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link"  id="bb"> <SlMagnifier className='t'/> </Link>
 

</div>  
<div className='ta'> <strong> Table Des Epreuves!</strong></div>
<Popupajouterepreuve />




</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >operation</th> 

<th >epreuve</th>
<th >date</th>
<th >heure</th>
<th >lieu</th>
<th >nature</th>
<th >matiere</th>




</tr>
{element && element.filter((element)=>{ 
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || element?.NomEpreuve.toLowerCase().includes(lowerCaseSearch) || element?.Code_mat?.LibelleMatiere.toLowerCase().includes(lowerCaseSearch) ) ;
}).map((element,index) => (
  <tr className='headerr' key={index}>
    <td>
    
      <Link to={`/uihh/${element?._id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(element?._id) }}><TfiTrash /></button>
    </td>
 
   
    
    <td>{element?.NomEpreuve}</td>
    <td >{element?.DateEpreuve}</td>
    <td >{element?.HeureEpreuve}</td>
    <td >{element?.LieuEpreuve}</td>  
    <td >{element?.NatureEpreuve}</td>
    <td >{element?.Code_mat?.LibelleMatiere}</td>

    
  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Tabretepreuve; // changer nom
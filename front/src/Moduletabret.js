import Module from './Module';



import Update3 from'./Update3'; 
import { useState} from 'react';
import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';

 import Popupajouter3 from './Popupajouter3'; 
 import { SlMagnifier } from 'react-icons/sl';

import './Search.css';




import './tabret.css';
import { Link } from 'react-router-dom';
const Moduletabret=({element,isWaiting,deleteaction,serverError})=> { 
  const  [search,setSearch ] = useState('');
 return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd'  placeholder='Search...' onChange={(e)=>setSearch(e.target.value)} />
 <Link to="/C" className="nav-link"  id='bb' > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter3 />
<div className='ta'> <strong> Table Des Modules!</strong></div>

</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >Operation</th>
<th >Libelle</th>
<th >Coefficient</th>
<th >Semestre</th>
<th >Classe</th>
<th > Nombre Du Matiere</th>
<th >VH_Global</th>


</tr>
{  element && element.filter((element)=>{ 
   
    const lowerCaseSearch = search.toLowerCase();
  
    return (!lowerCaseSearch || element?.classe.toLowerCase().includes(lowerCaseSearch)|| element?.LibelleModule.toLowerCase().includes(lowerCaseSearch));
  }).map((element,index) => (
  <tr className='headerr' key={index}>
    <td>
      <Link to={`/uio/${element?._id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(element?._id) }}><TfiTrash /></button>
    </td>
   
    
   
    <td>{element?.LibelleModule}</td>
    { <td >{element?.coefficient?.$numberDecimal}</td> }
    <td >{element?.semestre}</td>
    <td >{element?.classe}</td>
    <td >{element?.matiereCount}</td>
    <td >{element?.VH_Global}</td> 
   
  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Moduletabret;

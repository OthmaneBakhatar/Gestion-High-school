
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';


import Popupajouter2 from './Popupajouter2';
import { useState} from 'react';

import Update1 from'./Update1';
import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';



import './tabret.css';


const Tabret1=({filiere,deleteaction})=> {

    
  const  [search,setSearch ] = useState('');

 return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link" id='bb' > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter2 />
<div className='ta'> <strong> Table Des Filieres!</strong></div>

</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >Operation</th>

<th >Nom</th>
<th >Description</th>
<th >Nb_Classe</th> 
<th >Nb_Etudiant</th>



</tr>
{console.log("test:"+filiere)}
{  filiere && filiere.filter((filiere)=>{ 
    
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || filiere.filiere.toLowerCase().includes(lowerCaseSearch));
}).map((filiere,index)=>(

<tr  className='headerr'key={index}>
<td> 
<Link to={{ pathname: `/ui1/${filiere?._id}`, state: { id: filiere?._id } }} className='by' ><TfiPencilAlt /></Link>




<button type="button" className='by' onClick={()=>{deleteaction(filiere?._id)}}> < TfiTrash />  </button>
    
</td>

<td> {filiere?.filiere}</td>
<td> {filiere?.desc}</td>

<td> {filiere.classes}</td>
<td> {filiere.total_etudiants}</td>


</tr>



))}

</thead>









</table>
</div>

</div>
);
} 
export default Tabret1;

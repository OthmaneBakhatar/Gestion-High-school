

import Searchresulttt from './Searchresulttt'; 

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';

import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';


import './tabret.css';
import { Link } from 'react-router-dom';
const Tabretresultat=({element,isWaiting,deleteaction,serverError})=> { // changer nom
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search'  id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link"  id='bb'> <SlMagnifier className='t'/> </Link>
 

</div> 





</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>

<th >Nom</th>
<th >Prenom</th>
<th >classe</th>
<th >filiere</th>

<th >module</th>
<th >note</th> 


</tr>

</thead>








</table>
</div>

</div>
);
} 
export default Tabretresultat; // changer nom

import Tabobmatiere from './Tabobmatiere';

import Searchobmatiere from './Searchobmatiere'; 

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';
import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';


import './tabret.css';
import { Link } from 'react-router-dom';
const Tabretobmat=({element,isWaiting,deleteaction,serverError})=> { // changer nom
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'>  
<div className='op'>
<div className='inp'>
 <input type="text" className='search'  id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link" id='bb' > <SlMagnifier className='t'/> </Link>
 

</div> 
<div className='ta'> <strong> Table Des Notes Matieres!</strong></div>




</div>
<div className='fg'>
<table>
<thead>
<tr className='header'>

<th >Nom</th>
<th >Prenom</th> 
<th >matiere</th> 
<th >note</th>  

<th >classe</th>
<th >filiere</th>





</tr>
{element && element.filter((element)=>{ 
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || element?.Nom.toLowerCase().includes(lowerCaseSearch) || element?.Prenom.toLowerCase().includes(lowerCaseSearch)  ||  element?.Matiere[0].toLowerCase().includes(lowerCaseSearch)) ;
}).map((element,index) => (
  <tr className='headerr' key={index}>
   
   
    
    <td>{element?.Nom}</td>
    <td >{element?.Prenom}</td> 
       <td >{element?.Matiere[0]}</td>  
          <td >{element?.avgNote?.$numberDecimal}</td>   

    <td >{element?.classe[0]}</td>
    <td >{element?.filiere[0]}</td>
 

  </tr>
))}


</thead>









</table>
</div>

</div>
);
} 
export default Tabretobmat; // changer nom
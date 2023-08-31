import Tabobmodule from './Tabobmodule';

import Searchobmodule from './Searchobmodule'; 

import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';

import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';


import './tabret.css';
import { Link } from 'react-router-dom';
const Tabretobmod=({element,isWaiting,deleteaction,serverError})=> { // changer nom
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search' id='upd' onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' />
 <Link to="/C" className="nav-link" id='bb' > <SlMagnifier className='t'/> </Link>
 

</div> 


<div className='ta'> <strong> Table Des Notes Modules!</strong></div>


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
{element && element.filter((element)=>{ 
  const lowerCaseSearch = search.toLowerCase();

  return (!lowerCaseSearch || element?._id?.Nom_Et.toLowerCase().includes(lowerCaseSearch) ||element?._id?.Prenom_Et.toLowerCase().includes(lowerCaseSearch)  ||  element?.element?.module.toLowerCase().includes(lowerCaseSearch)) ;
}).map((module, index) =>
  module.modules.map((moduleInfo, moduleIndex) => (
    <tr key={index + "_" + moduleIndex}>
      {moduleIndex === 0 && (
        <>
       
          <td rowSpan={module.modules.length}>{module._id.Nom_Et}</td>
          <td rowSpan={module.modules.length}>{module._id.Prenom_Et}</td> 
          <td rowSpan={module.modules.length}>{module._id.Nom_C}</td> 
          <td rowSpan={module.modules.length}>{module._id.Nom_F[0]}</td>
        </>
      )}
     
      <td>{moduleInfo.LibelleModule}</td>
      <td>{moduleInfo.avgNote.$numberDecimal}</td>
    </tr>
  ))
)}

</thead>








</table>
</div>

</div>
);
} 
export default Tabretobmod; // changer nom

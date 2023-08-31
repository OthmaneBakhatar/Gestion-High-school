import Classe from './Classe';

import SearchClasse from './SearchClasse';

import Update5 from'./Update5';
import { TfiPencilAlt } from 'react-icons/tfi';

import { TfiTrash } from 'react-icons/tfi';


import { TbEye } from 'react-icons/tb';

import { useParams } from 'react-router-dom';
import Popupajouter5 from './Popupajouter5';

import { useState} from 'react';
import { SlMagnifier } from 'react-icons/sl';
import './tabret.css';
import { Link } from 'react-router-dom';
const Classetabret=({element,isWaiting,deleteaction,serverError})=> {
  const  [search,setSearch ] = useState('');
  return(

<div className='jk'> 
<div className='op'>
<div className='inp'>
 <input type="text" className='search'  id='upd' placeholder='Search...' onChange={(e)=>setSearch(e.target.value)} />
 <Link to="/C" className="nav-link"  id='bb'> <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter5 />
<div className='ta'> <strong> Table Des Classes!</strong></div>

</div>

<div className='fg'>
<table>
<thead>
<tr className='header'>
<th >Operation</th>

<th >Nom Classe</th>
<th >Nom Filiere</th>
<th >Nombre Etudiants</th>
<th >Nombre Module</th>


</tr>
{element && element.map(({ filiere, classes_data }) =>
          classes_data.map(({ _id, nbr_etud, nbr_modules, Nom_c }) => (
            <tr key={_id}> 
             <td>
     
      <Link to={`/upclasse/${_id}`} className='by'><TfiPencilAlt /></Link>
      <button type="button" className='by' onClick={() => { deleteaction(_id) }}><TfiTrash /></button>
    </td>
              
              <td>{Nom_c}</td> 
              <td>{filiere.Nom_F}</td>
              <td>{nbr_etud}</td>
              <td>{nbr_modules}</td>
            </tr>
          ))
        )}

</thead>



 





</table>
</div>

</div>
);
} 
export default Classetabret;

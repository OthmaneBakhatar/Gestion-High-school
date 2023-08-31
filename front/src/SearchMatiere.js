
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';


import Popupajouter4 from './Popupajouter4';


const SearchMatiere=()=> {



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 

<select className='ui'>
    <option   disabled className=''>
        Categories
    </option>
    <option className='ss'>
     Nom Matiere
    </option>
    <option className='ss'>
  Nom Module
    </option>
   
 
</select>
<Popupajouter4 />
<div className='ta'> <strong> Table Des Matiere!</strong></div>

</div>
    );
} 
export default SearchMatiere;
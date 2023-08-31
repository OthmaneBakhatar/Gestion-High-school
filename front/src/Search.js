
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';


import Popupajouter1 from './Popupajouter1';

const Search=()=> {



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
        CNE
    </option>
</select> 

<Popupajouter1 /> 
<button >envoyer</button>
<div className='ta'> <strong> Table Des Etudiants!</strong></div>

</div>
    );
} 
export default Search;
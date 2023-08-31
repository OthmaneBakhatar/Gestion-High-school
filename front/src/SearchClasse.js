

import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';


import Popupajouter5 from './Popupajouter5';

const SearchClasse=()=> {



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter5 />
<div className='ta'> <strong> Table Des Classe!</strong></div>

</div>
    );
} 
export default SearchClasse;
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';


import Popupajouter3 from './Popupajouter3';

const SearchModule=()=> {



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouter3 />
<div className='ta'> <strong> Table Des Module!</strong></div>

</div>
    );
} 
export default SearchModule;
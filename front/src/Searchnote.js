
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';

import Popupajouternote from './Popupajouternote';

const Searchnote=()=> { //



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouternote /> 

<div className='ta'> <strong> Table De Note !</strong></div>

</div>
    );
} 
export default Searchnote; // smya dial file
// supprimer popup ajouter 
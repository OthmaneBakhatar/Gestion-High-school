
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';

import Popupajouterepreuve from './Popupajouterepreuve';

const Searchepreuve=()=> { //



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 


<Popupajouterepreuve /> 

<div className='ta'> <strong> Table d'epreuve !</strong></div>

</div>
    );
} 
export default Searchepreuve; // smya dial file
// supprimer popup ajouter 
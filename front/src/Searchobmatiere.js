
import { SlMagnifier } from 'react-icons/sl';
import {Link} from 'react-router-dom'; 
import './Search.css';

const Searchobmatiere=()=> { //



    return(
        <div className='op'>
<div className='inp'>
 <input type="text" className='search' placeholder='Search...' />
 <Link to="/C" className="nav-link" > <SlMagnifier className='t'/> </Link>
 

</div> 



<div className='ta'> <strong> Table obtenir matiere</strong></div>

</div>
    );
} 
export default Searchobmatiere; // smya dial file
// supprimer popup ajouter 
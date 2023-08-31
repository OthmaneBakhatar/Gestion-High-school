import Classe from './Classe';
import Tab from './Tab';
import Naavbar from './Naavbar';
import Tabb1 from './Tabb1';
import Tabepreuve from './Tabepreuve';
import Tabnote from './Tabnote';
import Update from  './Update'; 
import Updatenote from  './Updatenote';
import Update1 from  './Update1'; 
import Updateepreuve from  './Updateepreuve';
import View from './View';
import View1 from './View1';
import View5 from './View5';
import Update5 from './Update5';
import View3 from './View3';
import Update3 from './Update3';
import Update4 from './Update4';
import View4 from './View4';
import { Route, Routes} from 'react-router-dom';
import Module from './Module';
import Matiere from './Matiere'; 
import Tabobmodule from './Tabobmodule'; 
import Tabobmatiere from './Tabobmatiere'; 
// import Tabresultattt from './Tabresultattt';
// import Signin from './Signin';
// import Signup from './Signup';
function App() { 
  // const location = useLocation();

  // // Check if the current path is not a restricted route
  // const showNavbar = !['/Signup', '/Signin'].includes(location.pathname);
  return(
    <div className='allll' >
       
< Naavbar/>
    <Routes> 
    {/* <Route path='/Signin' element={<Signin hideNavbar />} className="signin-page" />
        <Route path='/Signup' element={<Signup hideNavbar />} className="signup-page" /> */}
        {/* <Route path='/' element={<Signup hideNavbar />} /> */}
<Route path='/ui/:_id' element={ <Update/>} ></Route>
<Route path='/uio/:_id' element={ <Update3/>} ></Route>
<Route path='/ui1/:_id' element={ <Update1/>} ></Route>
<Route path='/view/:_id' element={ <View/>} ></Route>
<Route path='/Tab1' element={ <Tabb1/>} ></Route> 
<Route  path="/Tabnote" element={ <Tabnote/>} />
        <Route  path="/Tabepreuve" element={ <Tabepreuve/>} />
<Route path='/view1/:_id' element={ <View1/>} ></Route>
<Route path='/Tab' element={ <Tab/>} ></Route>
<Route path='/Tabb1' element={ <Matiere/>} ></Route>
<Route path='/Tabb4' element={ <Module/>} ></Route>
<Route path='/viewo:_id' element={ <View3/>} ></Route>
<Route path='/Tabb2' element={ <Classe/>} ></Route>

{/* <Route path='/uoi:_id' element={ <Update3/>} ></Route> */}
<Route path='/uihh/:_id' element={ <Updateepreuve/>} ></Route>
<Route path='/uioo/:_id' element={ <Update4/>} ></Route>
<Route path='/vieoow:_id' element={ <View4/>} ></Route>
<Route path='/upclasse/:_id' element={ <Update5/>} ></Route>
<Route path='/viewclasse:_id' element={ <View5/>} ></Route> 
<Route  path="/Tabobmodule" element={ <Tabobmodule/>} ></Route>  
<Route path='/uiii/:_id' element={ <Updatenote/>} ></Route>

<Route  path="/Tabobmatiere" element={ <Tabobmatiere/>} /> 
{/* <Route  path="/Tabresultattt" element={ <Tabresultattt/>} /> */}
{/* <Route path='/tabb3' element={ <Note/>} ></Route> */}
</Routes>
{/* {showNavbar && location.pathname !== '/Signup' && location.pathname !== '/Signin' && <Naavbar />} */}
    </div>
  );
}

export default App;


//NextjS

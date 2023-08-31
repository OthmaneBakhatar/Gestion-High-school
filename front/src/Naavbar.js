import React from 'react';
import { Route, Link, Routes } from "react-router-dom";
import Tab from './Tab'; 


import Tabb1 from './Tabb1';
import { AiOutlineUser, AiOutlineFolder, AiOutlineFileZip, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { RxGear } from 'react-icons/rx';
import { SlBookOpen, SlGraduation, SlNote, SlLogout, SlPencil } from 'react-icons/sl';
import { BiFoodMenu } from 'react-icons/bi'; 
import { TfiCalendar ,TfiEye} from "react-icons/tfi";
import { VscFileSubmodule , VscFolderActive } from "react-icons/vsc";
import './Naavbar.css';

const Naavbar = () => {
  return (
    <div className='io'>
      <div className='all'>
        <nav>
          <div className="menu">Menu</div>
          <hr />
          <Link to="/Tab" className="nav-link" ><button className='ko'>&emsp;<AiOutlineUser />&emsp;&emsp;Etudiant</button></Link><br />
          <Link to="/Tab1" className="nav-link" ><button className='ko'><SlGraduation />&emsp;&emsp;Filiere</button></Link>
          <Link to="/Tabb4" className="nav-link" ><button className='ko'>&emsp;<AiOutlineFolder />&emsp;&emsp;Module</button></Link>
          <Link to="/Tabb1" className="nav-link" ><button className='ko'>&emsp;<AiOutlineFileZip />&emsp;&emsp;Matiere</button></Link>
          <Link to="/Tabb2" className="nav-link" ><button className='ko'><AiOutlineUsergroupAdd />&emsp;&emsp;Classe</button></Link>
          <Link to="/Tabepreuve" className="nav-link" ><button className='ko'>&emsp;<SlPencil />&emsp;&emsp;Epreuve</button></Link>
          <Link to="/Tabnote" className="nav-link" ><button className='ko'><SlNote />&emsp;&emsp;Note</button></Link>
          <Link to="/Tabobmodule" className="nav-link" ><button className='koo'><VscFileSubmodule />&emsp;Notes module</button></Link>
<Link to="/Tabobmatiere" className="nav-link" ><button className='koo'><VscFolderActive />&emsp;Notes matiere</button></Link>    

        </nav>
      </div>
     
    </div>
  );
}

export default Naavbar;

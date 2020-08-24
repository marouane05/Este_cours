import React, { Component } from 'react'
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Navbar from '../Navbar'
import PrivateRoute  from './PrivateRoute'
import UnlockAccess from './PrivateRoute'
import Landing from '../Landing'
import Login from '../Login'
import Profile from '../Profile'
import AddEtudiant from '../Etudiants/AddEtudiant'
import ShowEtudiant from '../Etudiants/ShowEtudiant'
import AddProfesseur from '../Professeurs/AddProfesseur'
import ShowProfesseur from '../Professeurs/ShowProfesseur';

import UpdateProfesseur from '../Professeurs/UpdateProfesseur';
import UpdateEtudiant from '../Etudiants/UpdateEtudiant';
import UpdateUsers from '../Users/UpdateUsers';
import AddModule from '../Module/AddModule';
import ShowModules from '../Module/ShowModules';
import ProfesseurLive from '../Professeurs/ProfesseurLive';
// il est essentielle de préciser le role dans chaque route
const Main = () => ( 
        
         <div >
          <PrivateRoute restricted={true}  exact path="/" component={Landing} roles={['etudiant','professeur']} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute restricted={true} exact path="/profile" component={Profile} roles={['etudiant','professeur']}/>
         
          <PrivateRoute restricted={true}  exact path="/etudiant/add" component={AddEtudiant} roles={['etudiant','professeur']} />
      {//    <Route exact path="/etudiant/show" component={ShowEtudiant} />
         }
        
          <PrivateRoute restricted={true}  path="/etudiant/show" component={ ()=>(<ShowEtudiant/>) } roles={['etudiant','professeur']}/>

          <PrivateRoute restricted={true}  path="/professeur/add" component={AddProfesseur} roles={['professeur']}/>
          <PrivateRoute restricted={true}  path="/professeur/show" component={ShowProfesseur} roles={['etudiant','professeur']} />
          <PrivateRoute restricted={true}  path="/professeur/update/:professeurId" component={UpdateProfesseur} roles={['etudiant','professeur']}/>
          <PrivateRoute restricted={true}  path="/etudiant/update/:etudiantId" component={UpdateEtudiant} roles={['etudiant','professeur']}/>
          <PrivateRoute restricted={true}  path="/users/update" component={UpdateUsers} roles={['etudiant','professeur']}/>
          <PrivateRoute restricted={true}  path="/module/add" component={AddModule} roles={['etudiant','professeur']}/>
          <PrivateRoute restricted={true}  path="/module/get" component={ShowModules} roles={['etudiant','professeur']}/>
          <PrivateRoute restricted={true}  path="/professeur/live" component={ProfesseurLive} roles={['etudiant','professeur']}/>
          
          </div>
        )
    
export default Main ;

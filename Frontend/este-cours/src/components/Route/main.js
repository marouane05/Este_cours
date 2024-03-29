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
import AddCours from '../Cours/AddCours'
import UpdateProfesseur from '../Professeurs/UpdateProfesseur';
import UpdateEtudiant from '../Etudiants/UpdateEtudiant';
import UpdateUsers from '../Users/UpdateUsers';
import AddModule from '../Module/AddModule';
import ShowModules from '../Module/ShowModules';
import ProfesseurLive from '../Professeurs/ProfesseurLive';
import ShowDocumentCours from '../Cours/ShowDocumentCours'
import ShowVideoCours from '../Cours/ShowVideoCours'
import ShowCours from '../Cours/ShowCours'
import Test from '../Cours/test'
import ShowCoursToStudent from '../Cours/ShowCoursToStudent'
import ShowVideoCoursToStudent from '../Cours/ShowVideoCoursToStudent'
// il est essentielle de préciser le role dans chaque route
const Main = () => ( 
        
         <div >
          <PrivateRoute restricted={true}  exact path="/" component={Landing} roles={['etudiant','professeur']} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cours/add" component={AddCours} />
          <Route exact path="/cours/test" component={ShowDocumentCours} />
          <PrivateRoute exact path="/cours/show" component={ShowCours} roles={['professeur']}/>
          <PrivateRoute exact path="/cours/student" component={ShowCoursToStudent} roles={['etudiant']} />
          <Route exact path="/test" component={Test}/>
          <PrivateRoute exact path="/cours/show/MyVideos" component={ShowVideoCours} roles={['professeur']}/>
          <PrivateRoute exact path="/cours/show/video" component={ShowVideoCoursToStudent} roles={['etudiant']}/>
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

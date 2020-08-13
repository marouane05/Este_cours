import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Profile from './components/Profile'
import AddEtudiant from './components/Etudiants/AddEtudiant'
import ShowEtudiant from './components/Etudiants/ShowEtudiant'
import AddProfesseur from './components/Professeurs/AddProfesseur'
import ShowProfesseur from './components/Professeurs/ShowProfesseur';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UpdateProfesseur from './components/Professeurs/UpdateProfesseur';
import UpdateEtudiant from './components/Etudiants/UpdateEtudiant';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      
      <Navbar />
      <Route exact path="/" component={Landing} />
        <div className="container">
         
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/etudiant/add" component={AddEtudiant} />
          <Route exact path="/etudiant/show" component={ShowEtudiant} />
          <Route exact path="/professeur/add" component={AddProfesseur} />
          <Route exact path="/professeur/show" component={ShowProfesseur} />
          <Route path="/professeur/update/:professeurId" component={UpdateProfesseur}/>
          <Route path="/etudiant/update/:etudiantId" component={UpdateEtudiant}/>
        </div>
      </div>
    </Router>
  )
    }
}

export default App;

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
        
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/etudiant/add" className="nav-link">
            Gestion étudiant
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/etudiant/show" className="nav-link">
            Liste étudiant
          </Link>
        </li>

        
        <li className="nav-item">
          <Link to="/professeur/add" className="nav-link">
            Gestion professeur
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/professeur/show" className="nav-link">
            List professeur 
          </Link>
        </li>


        
        <li className="nav-item">
          <Link to="/addCour" className="nav-link">
            Add Cours
          </Link>
        </li>



        <li className="nav-item">
          <a onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              
            </li>

            <li className="nav-item">
            
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import  Home from '../icons/home.png' 
import Professor from '../icons/professor.png'
import Logout from '../icons/logout.png'
import Etudiant from '../icons/student.png'
import Setting from '../icons/setting.png'
import Cours from '../icons/cours.png'
import EsteLogo1 from '../icons/estelogo1.png'
import EsteLogo2 from '../icons/estelogo2.png'


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
          <Link to="/module/add" className="nav-link">
            Ajouter Module
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/module/get" className="nav-link">
            List Module
          </Link>
        </li>



        <li className="nav-item">
          <a onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    
 
/*
   <SideNav
   onSelect={(selected) => {
       // Add your code here
   }}
>
   <SideNav.Toggle />
   <SideNav.Nav defaultSelected="home">
       <NavItem eventKey="home">
           <NavIcon>
               <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
           </NavIcon>
           <NavText>
               Home
           </NavText>
       </NavItem>
       <NavItem eventKey="charts">
           <NavIcon>
               <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
           </NavIcon>
           <NavText>
               Charts
           </NavText>
           <NavItem eventKey="charts/linechart">
               <NavText>
                   Line Chart
               </NavText>
           </NavItem>
           <NavItem eventKey="charts/barchart">
               <NavText>
                   Bar Chart
               </NavText>
           </NavItem>
       </NavItem>
   </SideNav.Nav>
</SideNav>
  */  
      )

    return (
   <div>   
      <nav className="navbar navbar-expand-lg navbar-dark bg-success rounded">
      <br></br>
     
      

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
         {/* <a className="navbar-brand" href="#">
          <img src={EsteLogo2} alt=""  width="200"/>
        </a>
    */}
          <ul className="navbar-nav">
            <li className="nav-item">
            <div class="active-purple-3 active-purple-4 mb-4">
  <input class="form-control" type="text" placeholder="Search" aria-label="Search"/>
</div>
            </li>

           {/* <li className="nav-item">
            
    </li> */}
          </ul>
          {//localStorage.usertoken ? userLink : loginRegLink
          }
        </div>
      </nav>
    
   <SideNav
   onSelect={(selected) => {
       // Add your code here
   }}
>
   <SideNav.Toggle />
   <SideNav.Nav defaultSelected="home" >
       <NavItem eventKey="home">
           <NavIcon>
              
              <img src={Home} width="30" />
  
           </NavIcon>
           <NavText>
           <Link to="/profile" className="nav-link">
               Home
               </Link>
           </NavText>
       </NavItem>
       <NavItem eventKey="etudiant">
           <NavIcon>
             {//  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> 
             }
             {// <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="30" />
  }
<img src={Etudiant} width="30" />
          </NavIcon>
           <NavText>
               Gestion Etudiant
           </NavText>
           <NavItem eventKey="etudiant/add" className="text-success bg-light">
               <NavText>
               <Link to="/etudiant/add" className="text-success bg-light">
                   Ajouter
                   </Link>
               </NavText>
           </NavItem>
           <NavItem eventKey="etudiant/list" className="text-success bg-light">
               <NavText>
               <Link to="/etudiant/show" className="text-success bg-light">
                   Modifier
                   </Link>
               </NavText>
           </NavItem>
       </NavItem>

       <NavItem eventKey="professeur">
           <NavIcon>
             {//  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> 
             }
             {// <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="30" />
  }
  <img src={Professor} width="30" />
          </NavIcon>
           <NavText>
               Gestion professeur
           </NavText>
           <NavItem eventKey="professeur/add" className="text-success bg-light">
               <NavText >
               <Link to="/professeur/add" className="text-success bg-light">
                   Ajouter
                   </Link>
               </NavText>
           </NavItem>
           <NavItem eventKey="professeur/list"  className="text-success bg-light">
               <NavText>
               <Link to="/professeur/show" className="text-success bg-light">
              Modifier
                   </Link>
               </NavText>
           </NavItem>
           </NavItem>

           <NavItem eventKey="module">
           <NavIcon>
             {//  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> 
             }
             {// <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="30" />
  }
  <img src={Cours} width="30" />
          </NavIcon>
           <NavText>
               Gestion Module
           </NavText>
           <NavItem eventKey="module/add" className="text-success bg-light">
               <NavText>
               <Link to="/module/add" className="text-success bg-light">
                   Ajouter
                   </Link>
               </NavText>
           </NavItem>
           <NavItem eventKey="modulet/list" className="text-success bg-light">
               <NavText>
               <Link to="/module/get" className="nav-link" className="text-success bg-light">
                   Modifier
                   </Link>
               </NavText>
           </NavItem>
           </NavItem>


           <NavItem eventKey="setting">
           <NavIcon>
              
              <img src={Setting} width="30" />
  
           </NavIcon>
           <NavText>
           <Link to="/users/update" className="nav-link">
               Pamaramètre
               </Link>
           </NavText>
       </NavItem>



           <NavItem eventKey="logout">
           <NavIcon>
              
              <img src={Logout} width="30" />
  
           </NavIcon>
           <NavText>
           <Link to="/profile" className="nav-link">
               Logout
               </Link>
           </NavText>
       </NavItem>

   </SideNav.Nav>
</SideNav>
</div>
      )
  }
}

export default withRouter(Landing)
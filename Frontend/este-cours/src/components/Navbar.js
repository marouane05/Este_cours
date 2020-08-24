import React, { Component } from 'react'
import { Link, withRouter,BrowserRouter as Router } from 'react-router-dom'
import SideNav, { Toggle,  NavItem,NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import  Home from '../icons/home.png' 
import Professor from '../icons/professor.png'
import Logout from '../icons/logout.png'
import Etudiant from '../icons/student.png'
import Setting from '../icons/setting.png'
import Cours from '../icons/cours.png'
import EsteLogo1 from '../icons/estelogo1.png'
import EsteLogo2 from '../icons/estelogo2.png'
import ProfileImage from '../icons/profileImage.png'
import SettingColor from '../icons/SettingColor.png'
import LogoutColor from '../icons/logoutColor.png'
import AjouterIcon from '../icons/ajouterIcon.png'
import EditIcon from '../icons/editIcon.png'
import { Layout, Header, Navigation,
   Drawer, Content,Footer,FooterSection
  ,FooterDropDownSection,FooterLinkList,IconButton,MenuItem
,Menu, 
Icon} from 'react-mdl';
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import Main from './Route/main'
 import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import jwt_decode from 'jwt-decode'

class Landing extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false,
        navCollapsed: true,
        showNavbar: false ,
        ManageEtudiant : false ,
        ManageProfesseur : false,
        ManageModule : false ,
   
    };
}



toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
}

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    const { navCollapsed } = this.state

const loginRegLink1=(
<div style={{position: 'relative'}}>
     
   
    <Menu target="demo-menu-lower-right" align="right">
       
    <Link to="/login" className="nav-link">
                   <MenuItem> <img src={SettingColor} width="30"/> Login </MenuItem>      
               </Link>
    
        
        
    </Menu>
</div>
)

    const loginRegLink = (
 <Navigation>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          </Navigation>
    )
    const userLink1=(
      <div style={{position: 'relative'}}>
      <img src={ProfileImage} width="50"   />
     <IconButton name="more_vert" id="demo-menu-lower-right" />
    <Menu target="demo-menu-lower-right" align="right">
       
         <Link to="/users/update" className="nav-link">
       
        
        <MenuItem> <img src={SettingColor} width="30"/> Paramètres</MenuItem>      
               </Link>
      <a onClick={this.logOut.bind(this)} className="nav-link">
        <MenuItem>   <img src={LogoutColor} width="30"/> Se déconnecter </MenuItem>
          </a>
        
        
    </Menu>
</div>
    )

    const userLink = (

            
  <SideNav.Nav defaultSelected="home" >
        
       <NavItem eventKey="home">
      
 
     <NavIcon><img src={Home} width="30"  /></NavIcon>  
    
     <Link to="/profile" >  <a style={{ color: "white",
     
      padding: "6px",
      fontFamily: "Arial"}}>Home</a> </Link>    
     </NavItem>

      
     <NavItem eventKey="etudiant" onClick={(e)=>this.setState({
       ManageEtudiant : !this.state.ManageEtudiant
     })}>
           <NavIcon>
             {//  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> 
             }
             {// <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="30" />
  }
<img src={Etudiant} width="30" />
          </NavIcon>
          <a style={{ color: "white",
     
     padding: "6px",
     fontFamily: "Arial"}}>
               Gestion Etudiant
           </a>
       
      
       </NavItem>


                              { this.state.ManageEtudiant == true ?
    
   
                                   <NavItem eventKey="etudiantadd" className="text-success bg-light">
                                    <NavIcon>

                                   <img src={AjouterIcon} width="30" />
                                  </NavIcon>
                                   <Link to="/etudiant/add" className="text-success bg-light" >
                                   <a  style={{ 
                                   
                                      padding: "6px",
                                  fontFamily: "Arial"}}>       Ajouter  </a>
                                     </Link>

                                    </NavItem> 
                                               : <div> </div>
                                           }



                                      { this.state.ManageEtudiant == true ?
                                       <NavItem eventKey="etudiant/list" className="text-success bg-light">
                                        <NavIcon>
           
                                      <img src={EditIcon} width="30" />
                                             </NavIcon>
                                            <Link to="/etudiant/show" className="text-success bg-light">
                                        <a  style={{ 
     
                                            padding: "6px",
                                             fontFamily: "Arial"}}> Modifier </a>
                                                 </Link>

                                    </NavItem> : <div></div>

                                    }






       <NavItem eventKey="professeur" onClick={(e)=>this.setState({
         ManageProfesseur : ! this.state.ManageProfesseur
       })}>
           <NavIcon>
            
  <img src={Professor} width="30" />
          </NavIcon>
          <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}>
               Gestion professeur
         </a>
           
           </NavItem>

{ this.state.ManageProfesseur == true ?
           <NavItem eventKey="professeur/add" className="text-success bg-light">
             <NavIcon>

<img src={AjouterIcon} width="30" />
</NavIcon>
               <Link to="/professeur/add" className="text-success bg-light">
               <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}>     Ajouter </a>
                   </Link>
              
           </NavItem>
        : <div></div>
}       
        
      {this.state.ManageProfesseur == true ?
           <NavItem eventKey="professeur/list"  className="text-success bg-light">
              <NavIcon>
           
           <img src={EditIcon} width="30" />
                  </NavIcon>
            
               <Link to="/professeur/show" className="text-success bg-light">
               <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}>    Modifier </a>
                   </Link>
               </NavItem>
            : <div></div>
  }







           <NavItem eventKey="module"
           onClick={(e=>this.setState({
             ManageModule : ! this.state.ManageModule
           }))}>
           <NavIcon>
             {//  <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} /> 
             }
             {// <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="30" />
  }
  <img src={Cours} width="30" />
          </NavIcon>

          <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}>  Gestion Module </a>
          
          
           </NavItem>


{ this.state.ManageModule == true ?

           <NavItem eventKey="module/add" className="text-success bg-light">
                <NavIcon>
           
           <img src={AjouterIcon} width="30" />
                  </NavIcon>
            
               <Link to="/module/add" className="text-success bg-light">
               <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}> Ajouter </a>
                   </Link>
           </NavItem> : <div></div>

}
{ this.state.ManageModule == true ?
           <NavItem eventKey="modulet/list" className="text-success bg-light">
                <NavIcon>
           
           <img src={EditIcon} width="30" />
                  </NavIcon>
            
               <Link to="/module/get" className="nav-link" className="text-success bg-light">
               <a  style={{ 
     
     padding: "6px",
      fontFamily: "Arial"}}>  Modifier </a>
                   </Link>
                   </NavItem> : <div></div>

}







               </SideNav.Nav>
               
      )

    return (
   
   <div className="demo-big-content">
      <Layout fixedHeader >
         {//<Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
  }

<Header style={{backgroundColor: '	#09c431'}} title={<span><strong></strong></span>}>
            <Navigation>


  

              
            {localStorage.usertoken ? userLink1 : loginRegLink1
    }




              </Navigation>
          </Header>




          
          <Drawer onSelect={(selected) => {
       // Add your code here
   }} title={<span><img src={EsteLogo2} style={{ width: 170,height:50 }}></img></span>} style={{backgroundColor: '	#09c431' }}>
           
          {localStorage.usertoken ? userLink : loginRegLink
    }

          </Drawer>
          <Content >
          <div className="page-content" />
            <Main />
            </Content>
      </Layout>



   
  </div>

      )
  }
  
}


export default withRouter(Landing)
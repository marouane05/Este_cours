import React, { Component } from 'react'
import { Link, withRouter,BrowserRouter as Router, Redirect } from 'react-router-dom'
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
import BookIcon from '@material-ui/icons/Book';
import ContactsIcon from '@material-ui/icons/Contacts';
import DnsIcon from '@material-ui/icons/Dns';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

/*
import { Layout, Header, Navigation,
   Drawer, Content,Footer,FooterSection
  ,FooterDropDownSection,FooterLinkList,IconButton,MenuItem
,Menu, 
Icon} from 'react-mdl';
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
*/

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import { fade,makeStyles, useTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';



import Main from './Route/main'
 /*import {
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
} from 'reactstrap' */
import jwt_decode from 'jwt-decode'
import ShowVideoCoursToStudent from './Cours/ShowVideoCoursToStudent';
import ShowCours from './Cours/ShowCours';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

 
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },


  root: {
    display: 'flex',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




function ListOneItem (title,link,type,logOut){

  return(
  <List>
{ type == 'exit' ? 
 
 <ListItem button onClick={logOut}>
<ListItemIcon>{
<ExitToAppIcon/>}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
  

:

        <Link to={link} className="text-dark" > 
       <ListItem button >
<ListItemIcon>{
    type=="cours" ?
    < BookIcon /> : type=="home" ? <HomeIcon/> : 
    type=="setting" ? <SettingsIcon/> : <ExitToAppIcon/>}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
        </Link>
}
   
    </List>
  )
}


      
function ListOfItem (title,subtitle1,subtitle2,link1,link2,Click,op,type){
  return(
  <List>
  <ListItem button open={op} onClick={Click} >
  <ListItemIcon>{
    type=="cours" ?
    < BookIcon /> : type=="module" ? <DnsIcon/> : <ContactsIcon/>}
  </ListItemIcon>
  <ListItemText primary={title} />
</ListItem>

    <Collapse component="li" in={op} timeout="auto" unmountOnExit>
   
      <List disablePadding>
        <Link to={link1} className="text-dark">
        <ListItem button  >
        <ListItemIcon><AddBoxIcon/></ListItemIcon>
        <ListItemText color={'black'} primary={subtitle1} />
          </ListItem>
          </Link>

          <Link to={link2} className="text-dark">
        <ListItem button >
        <ListItemIcon><BorderColorIcon /></ListItemIcon>         
        <ListItemText  primary={subtitle2} />
          </ListItem>
          </Link>
      </List>
  
    </Collapse>
   
  </List>
  )
}



function Landing(props) {



      const { window } = props;
      const classes = useStyles();
      const theme = useTheme();
      const history = useHistory();
      const [mobileOpen, setMobileOpen] = React.useState(false);
    
      const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const logOut =(e)=> {
        e.preventDefault()
        
        localStorage.clear()
      //  localStorage.removeItem('usertoken')
      
      history.push('/login')
      }

      const loginRegLink =(
        <div></div>
      )

      const [open, setOpen] = React.useState(false);

      const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
      };

      
           

     

      const AdminLink =(
        <div >
        <div className={classes.toolbar} />
        <Divider />
        { ListOneItem('profile','/profile','home')}
   
  {ListOfItem('Gestion professeurs','Ajouter','Liste','/professeur/add','/professeur/show',handleClick,'cours')}
  {ListOfItem('Gestion etudiants','Ajouter','Liste','/etudiant/add','/etudiant/show',handleClick,'cours')}
  {ListOfItem('Gestion modules','Ajouter','Liste','/module/add','/module/get',handleClick,'module')}         
        <Divider />
        { ListOneItem('paramètres','/profile','setting')}
        { ListOneItem('se déconnecter','/profile','exit',logOut)}
          </div>
      )


      const EtudiantLink=(
        <div >
        <div className={classes.toolbar} />
        <Divider />
        { ListOneItem('profile','/profile','home')}
        { ListOneItem('cours','/cours/student','cours')}   
               
        <Divider />
        { ListOneItem('paramètres','/profile','setting',logOut)}
        { ListOneItem('se déconnecter','/profile','exit',logOut)}
          </div>
      )


      const ProfesseurLink=(

        <div >
        <div className={classes.toolbar} />
        <Divider />
        { ListOneItem('profile','/profile','home')}
          
         
  {ListOfItem('Gestion cours','Ajouter','Liste','/cours/add','/cours/show',handleClick,open,'cours')}
          
        <Divider />
        { ListOneItem('paramètres','/profile','setting')}
        { ListOneItem('se déconnecter','/profile','exit',logOut)}
          </div>

      )


    
      const drawer = (
        
          localStorage.usertoken ?
          localStorage.type=="etudiant" ? EtudiantLink
          : localStorage.type=="professeur" ? ProfesseurLink :AdminLink 
          
          : loginRegLink
   
          
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;
    


















    return (
   
  
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ESTE PLATEFORME
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>


        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <br></br>
            <img src={EsteLogo2} />
            
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      <div className={classes.toolbar} />
        
      <Main />

      </main>
    </div>


          
        
      )
 // }
  
}


export default withRouter(Landing)
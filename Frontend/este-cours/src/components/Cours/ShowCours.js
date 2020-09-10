import React, { Component } from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import CustomizedMenus from './test'

import pdfIcon from '../../icons/pdfIcon.png'
export default class ShowCours extends Component {

constructor(){
    super();
    this.state={
        cours : [],
        anchorEl: null,
        redirect   : null ,
        int : '',
        url:'',
    }
}

componentDidMount(){
    if(localStorage.type =="professeur")
    {
const professeurId = localStorage.identification
        axios.get(`/cours/prof/${professeurId}`)
        .then(res => {
          const cours = res.data;
          this.setState({ cours });
        })
console.log("oui")

    }
    else if(localStorage.type=="etudiant")
    {
        console.log("non")
    }
}

handleClick = (intitule,urll,event) => {
  this.setState({ anchorEl: event.currentTarget ,
    int : intitule,
    url : urll });
};

handleClose = () => {
  this.setState({ anchorEl: null });
};





useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));








    render() {
        const classes = this.useStyles;
        const { anchorEl } = this.state;
// design button 


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



        return (
         
           
       <div>  
           <div className="container ">
 
 
 <br></br>             


<br></br>  
    <div class="row justify-content-center">
<div className="col-md-10">
     <div className="card">
        
         <div className="card-body">


             
           <GridList cellHeight={180}  className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>       
        {this.state.cours.map((cour)=>
        
          < GridListTile key={cour.id}>
           <img src={pdfIcon} alt={cour.intitule} />
           <GridListTileBar
             title={cour.intitule}
             subtitle={<span>Publié le : {cour.updatedAt}</span>}
             actionIcon={
               <IconButton aria-label={`info about ${cour.intitule}`} className={classes.icon}>
   
   
        <Button
         aria-controls="customized-menu"
         aria-haspopup="true"
         variant="contained"
         color="primary"
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
          onClick={(event) => {
            this.setState({ anchorEl: event.currentTarget ,
              int : cour.intitule,
              url : cour.url });
          }}
        
        >
          Open Menu
        </Button>
        <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleClose}
    >
       {this.listMenu(this.state.int,this.state.url)}
       </Menu>


               </IconButton>
             }
           />
         </GridListTile>
        

)}
</GridList>

</div> </div> </div> </div> </div> </div> 

        )
    }

    listMenu(int,urll){
    return <div>
      <MenuItem onClick={()=>this.props.history.push('/cours/test',{intitule:int,url : urll})}>Profile</MenuItem>
      <MenuItem>{int}</MenuItem>
      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
      </div>
    }
}



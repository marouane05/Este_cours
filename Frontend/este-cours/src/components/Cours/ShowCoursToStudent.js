import React, { Component ,Fragment } from 'react'

import axios from 'axios';
import 'bulma/css/bulma.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Select from 'react-select';
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
import "react-alert-confirm/dist/index.css";
import confirm, { Button as ButtonAlert, alert } from "react-alert-confirm";
import pdfIcon from '../../icons/pdfIcon.png'
import VideoIcon from '../../icons/VideoIcon.png'
import { Input } from '@material-ui/core';
export default class ShowCoursToStudent extends Component {

constructor(){
    super();
    this.state={
        modules : [],
        anchorEl: null,
        redirect   : null ,
        int : '',
        url:'',
        description :'',
        id:'',
        typeCours:'',
        descriptionModifier:'',
        intituleModifier:'',
        FiliereCours :'',
        ModuleCours :null,
        IntituleCours :'',
    
        cours : [],
    }
}

UpdateCourses(){

   if(this.state.ModuleCours != null){
    axios.get(`/cours/module/${this.state.ModuleCours}`)
    .then(res => {
      const cours = res.data;
      this.setState({ cours });
    })
   }
}



UpdateComponent(){
  
   // const etudiantId = localStorage.identification
      axios.get(`/module/byFiliere/${localStorage.filiere}`)
      .then(res => {
        const modules = res.data;
       
        const options = res.data.map(d => ({
            "label" : d.intitule+ ' ( Semestre '+d.id_semestre +')',
            "id" : d.id ,
            "idF" : d.FiliereId ,
            "intit" : d.intitule
            
          }))
          this.setState({
            selectOptions : options
        })

          this.setState({ modules });

      })
console.log("oui")

      console.log("non")
  }

componentDidMount(){
    
  this.UpdateComponent()
}

handleClick = (intitule,urll,event) => {
  this.setState({ anchorEl: event.currentTarget ,
    int : intitule,
    url : urll });
};

handleClose = () => {
  this.setState({ anchorEl: null });
};

handleChange2=(e)=>{
    this.setState({ModuleCours:e.id, FiliereCours:e.idF , IntituleCours : e.intit})
    console.log(`Option selected:`,this.state.FiliereCours);
   // this.UpdateCourses()
  axios.get(`/cours/module/${e.id}`)
   .then(res => {
     const cours = res.data;
     this.setState({ cours });
   })
     

}


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
 
 
           <Select
      //  value={this.state.ModuleCours}
        onChange={this.handleChange2.bind(this)}
        options={this.state.selectOptions}
    //    {...this.props}
   

      />
 <br></br>             


<br></br>  
    <div class="row justify-content-center">
<div className="col-md-7">
     <div className="card">
     
         <div className="card-body">

             
           <GridList cellHeight={240}   className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>       
        { this.state.cours.map((cour)=>
        
          < GridListTile key={cour.id}>
           <img src={this.renderIcon(cour.typeCours)} alt={cour.intitule} />
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
              url : cour.url ,
            description : cour.description,
          id: cour.id ,
        typeCours : cour.typeCours});
          }}
        
        >
          Option
        </Button>
        <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleClose}
    >
       {this.listMenu(this.state.id,this.state.int,this.state.url,this.state.typeCours,this.state.description)}
       </Menu>


               </IconButton>
             }
           />
         </GridListTile>
        

) }
</GridList>

</div> </div> </div> </div> </div> </div> 

        )
    }

    listMenu(id,int,urll,type){
      if(type=="document"){
    return <div>
      <MenuItem onClick={()=>this.props.history.push('/cours/test',{intitule:int,url : urll,id :id})}>ouvrir</MenuItem>
      
      </div> }
      else
      {
        return <div>
        <MenuItem onClick={()=>this.props.history.push('/cours/show/video',{intitule:int,url : urll,id : id})}>ouvrir</MenuItem>
        
        </div>
      }
    }
    renderIcon(type){
      if(type=="document"){ return pdfIcon}
      else {return VideoIcon}
    }

    
}



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
export default class ShowCours extends Component {

constructor(){
    super();
    this.state={
        cours : [],
        anchorEl: null,
        redirect   : null ,
        int : '',
        url:'',
        description :'',
        id:'',
        typeCours:'',
        descriptionModifier:'',
        intituleModifier:'',
    }
}

UpdateComponent(){
  
const professeurId = localStorage.identification
      axios.get(`/cours/prof/${professeurId}`)
      .then(res => {
        const cours = res.data;
        this.setState({ cours });
      })

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

updateCours=(id)=>{

  confirm({
    title: "Modifier votre cours",
    content: (
      <Fragment>
        <div id="blog_post">
         <div className="form-group justify-content-center">
                        <label className="col-sm-2 control-label required" htmlFor="nom">Intitule</label>
                        <div className="col-sm-10">
        <input type="text"
         className="form-control"
         name="int"
         placeholder="Ecrire un nouveau intitule"
        // value={this.state.int}
         onChange={(e)=>this.setState({
           int : e.target.value
         })}
      
                             />
</div>
</div>
<div className="form-group">
<label className="col-sm-2 control-label required" htmlFor="nom">Description</label>
                        <div className="col-sm-10">
         <textarea type="text"
         className="form-control"
         name="description"
         placeholder="Ecrire une nouvelle description"
       //   value={this.state.description}
         onChange={(e)=>this.setState({
          description : e.target.value
        })}
         
                             />
                             </div>
                             </div>
                             </div>
      </Fragment>
    ),
    lang: "en",
    onOk: () => {
      const Form ={
        id: id,
        intitule: this.state.int,
        description : this.state.description
      }
      console.log(" intituleM" +Form.id);
axios.put(`/cours`,Form,{}).then(res=>{
  console.log(res);
  console.log(res.data);
  this.UpdateComponent();
}).catch((err)=>console.log(err))
   
    },
    onCancel: () => {
      console.log("cancel");
    }
  });



}


deleteCours =(courId,courUrl,courIntitule)=>{
const File= {
  courId : courId,
  url : courUrl
}
  confirm({
    title: "Etes vous sur ?",
    content: "Vous voulez supprimer "+courIntitule,
    footer: (dispatch) => (
      <Fragment>
        <ButtonAlert onClick={() => dispatch("cancel")}>Annuler</ButtonAlert>
        <ButtonAlert onClick={() => dispatch("ok")} styleType="danger">
          oui
        </ButtonAlert>
      </Fragment>
    ),
    closeBefore: (action, close) => {
      if (action === "ok") {
console.log('id envoye',File.courId)
        axios.delete(`/cours`,{data:File},{})
  .then(res => {
      console.log(res);
      console.log(res.data);
      window.location.reload()})
    .catch(err => console.log(err));
     
      
    } else {
        close();
      }
    }
  });


  

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
        {this.state.cours.map((cour)=>
        
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
        

)}
</GridList>

</div> </div> </div> </div> </div> </div> 

        )
    }

    listMenu(id,int,urll,type,descr){
      if(type=="document"){
    return <div>
      <MenuItem onClick={()=>this.props.history.push('/cours/test',{intitule:int,url : urll,id : id,description : descr})}>ouvrir</MenuItem>
      <MenuItem onClick={()=>this.updateCours(id)}>modifier</MenuItem>
      <MenuItem onClick={()=>this.deleteCours(id,urll,int)}>supprimer</MenuItem>
      </div> }
      else
      {
        return <div>
        <MenuItem onClick={()=>this.props.history.push('/cours/show/MyVideos',{intitule:int,url : urll,id : id,description : descr})}>ouvrir</MenuItem>
        <MenuItem onClick={()=>this.updateCours(id)}>modifier</MenuItem>
        <MenuItem onClick={()=>this.deleteCours(id,urll,int)}>supprimer</MenuItem>
        </div>
      }
    }
    renderIcon(type){
      if(type=="document"){ return pdfIcon}
      else {return VideoIcon}
    }

    
}



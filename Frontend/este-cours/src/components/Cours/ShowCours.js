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
import pdfIcon from '../../icons/pdfIcon.png'
export default class ShowCours extends Component {

constructor(){
    super();
    this.state={
        cours : [],
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
                 <InfoIcon />
               </IconButton>
             }
           />
         </GridListTile>
        

)}
</GridList>

</div> </div> </div> </div> </div> </div> 

        )
    }
}

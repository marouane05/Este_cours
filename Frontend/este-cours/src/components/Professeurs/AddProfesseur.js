import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddProfesseur extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departement :'' ,
            nom :'',
            prenom :'',
           
            naissance: new Date(),
            tele :'',
            email :'', 
         
            startDate: new Date()
        }
       
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }


    
    onSubmit(e) {
        e.preventDefault()
        const ProfesseurData ={
            nom :this.state.nom,
            prenom :this.state.prenom,
            
            naissance:this.state.naissance,
            tele :this.state.tele,
            email :this.state.email, 
          
            departement : this.state.departement


        }


        const UserData = {
            username : this.state.nom+'.'+this.state.prenom,
            email : this.state.email,
            type : 'professeur',
            password : this.state.nom+'@'+this.state.email
        }
        axios.post("/professeur/add", ProfesseurData, {
        }).then(res => {
           
            console.log(res)
       {     axios.post("/users/register", UserData, {
            }).then(res => {
               
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            }) }
        })
        .catch(err =>{
            console.log(err)
        })

        


    }
    handleChange = (e) =>{
        e.preventDefault()
        const {name , value} = e.target
        this.setState({ [name]: value });
        // let fields= this.state.fields ;
        // this.setState({
        //     fields 
        // }) ;
        
        // fields[e.target.name]= e.target.value ;
    }
    handleChange2 = date => {
        this.setState({
          naissance: date
        });
      };

    render() {
        return (
            <div className="container ">
            <br></br>             
        
       
<br></br>  
               <div class="row justify-content-center">
        <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Ajouter professeur</div>
                    <div className="card-body">
           
            {/* <div className="row"> */}
                <form onSubmit={this.onSubmit}>
                    
                   
             
                    <div className="form-group w-80">{this.choix_departement()} </div>
             


{/* début row */}
                    <div className="form-row">
                         {/*debut column */}
                    <div className="col-md-6">
                    <div className="md-form form-group">
                    <label htmlFor="nom">nom :</label>
                        <input
                        type="text"
                        className="form-control"
                        name="nom"
                        placeholder="Entrer nom du professeur"
                        value={this.state.nom}
                        onChange={this.handleChange} />
                    </div>
                   </div>

                    <div class="col-md-6">
                     <div class="md-form form-group">
                     <label htmlFor="prenom">prenom :</label>
                        <input
                        type="text"
                        className="form-control"
                        name="prenom"
                        placeholder="Entrer prénom du professeur"
                        value={this.state.prenom}
                        onChange={this.handleChange} />
                    </div>
                     </div>

                     {/*fin column  */}
                        </div>
{/* fin row */}
                 


{/* début row */}
<div className="form-row">
                         {/*debut column */}
                    <div className="col-md-6">
                    <div className="md-form form-group">
                    <label htmlFor="email">Email :</label>
                        <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Entrer l'email du professeur"
                        value={this.state.email}
                        onChange={this.handleChange} />
                        </div>
                        </div>

                        {/*fin column  */}

                        <div class="col-md-6">
                        <label htmlFor="tele">Numéro de Tél:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="tele"
                        placeholder="Entrer numéro de Tél"
                        value={this.state.tele}
                        onChange={this.handleChange} />
                  
                      
                        </div>
                        </div>
{/* fin row */}




{/* début row */}
<div className="form-row ">
                         {/*debut column */}
                       
                    <div className="md-form form-group">
                    <label >Naissance :</label>
                    <div className="col-md-12">
                       <DatePicker className="form-control"
   selected={this.state.naissance}

   onChange={this.handleChange2}
   dateFormat="yyyy-MM-dd"
   placeholderText="Entrer la date de naissance du professeur"
                   /> 
                        </div>
                          </div>
                         {/*fin column  */}

                         </div>
{/* fin row */}



                    
<br></br>
                             

                    
                    
                  
                        
                    
                    <div className="col-md-6 offset-md-3">
                        <button className="btn btn-primary" type="submit">Ajouter</button>
                    </div>
                </form>
            {/* </div> */}
        </div>
        </div>
        </div>
        </div>
        </div>
        )
    }

    choix_departement(){
        return(
          <div className="input-group mb-3" align="center">
            <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Filiere</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" 
            onChange={(e) => this.setState({ departement: e.target.value  })}>
                <option value=" ">choisir filiere</option> 
                <option value="Informatique">Informatique</option>
                <option value="Energie renouvelable">Energie renouvelable</option>
                <option value="Tourisme">Tourisme</option>
                <option value="Management">Management</option>
               
            </select>
            {console.log('valeur'+ this.state.departement)}
          </div>
          
        ) ;
    }
}

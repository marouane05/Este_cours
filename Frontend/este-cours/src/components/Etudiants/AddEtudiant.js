import React, { Component  , useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddEtudiant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            nom :'',
            prenom :'',
            cne : '',
            naissance: new Date(),
            tele :'',
            email :'', 
            FiliereId:'',
            startDate: new Date()
        }
       
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const EtudiantData ={
            nom :this.state.nom,
            prenom :this.state.prenom,
            cne : this.state.cne,
            naissance:this.state.naissance,
            tele :this.state.tele,
            email :this.state.email, 
            filiere: this.state.FiliereId,



        }


        const UserData = {
            username : this.state.nom+'.'+this.state.prenom,
            email : this.state.email,
            type : 'etudiant',
            password : this.state.nom+'@'+this.state.cne
        }
        axios.post("/etudiant/add", EtudiantData, {
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
                        <div className="card-header">Ajouter Etudiant</div>
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
                            placeholder="Entrer nom de l'étuiant"
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
                            placeholder="Entrer prénom de l'étudiant"
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
                        <label> CNE : </label>
                                <input 
                                        type ="text"
                                        name="cne"
                                        placeholder="ex: B32785214"
                                       className = "form-control"
                                       value = {this.state.cne}
                                       onChange = {this.handleChange} 
                                />
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
<div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <label htmlFor="email">Email :</label>
                            <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Entrer l'email de l'étudiant"
                            value={this.state.email}
                            onChange={this.handleChange} />
         
                        </div>
                        </div>
                           {/*fin column  */}
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
       placeholderText="Entrer la date de naissance de l'étudiant"
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
            onChange={(e) => this.setState({ FiliereId: e.target.value  })}>
                <option value=" ">choisir filiere</option> 
                <option value="1">GI1</option>
                <option value="2">GI2</option>
                <option value="3">ISIL</option>
                <option value="4">GODT1</option>
                <option value="5">GODT2</option>
                <option value="6">IDSF1</option>
                <option value="7">Environnement1</option>
                <option value="8">ER1</option>
                <option value="9">ER2</option>
                <option value="10">ERDD</option>
                <option value="11">TM1</option>
                <option value="12">TM2</option>
                <option value="13">MBF</option>
                <option value="14">Management Trourisme</option>
            </select>
            {console.log('valeur'+ this.state.FiliereId)}
          </div>
          
        ) ;
    }
}

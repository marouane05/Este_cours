import React, { Component, Fragment } from 'react'
import {
    Button,
    Input,
    Footer,
    Card,
    CardBody,
    CardImage,
    CardTitle,
    CardText
  } from "mdbreact";
import axios from 'axios';
import TextInput from 'react-autocomplete-input';

import '../../styles/AutoComplete.css'
export default class AddModule extends Component {
    

    
    constructor(props) {
        super(props);

        this.state = {
           professeurs : [],
           intitule : '',
           FiliereId:'',
           semestre:'',
           professeur:'',
           startDate: new Date() ,
           chercheProf :'' ,
           nomProf: [], 
           idProf :'',


            // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""


        }
       
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get(`/professeur/All`)
        .then(res => {
          const professeurs = res.data
          console.log("resultat nom "+res.data)
     //     const nomProf = res.data["nom"];
          this.setState({ professeurs });
        })
      }

    onSubmit(e) {
        e.preventDefault()
        


        const ModuleData = {
           intitule : this.state.intitule ,
           filiere : this.state.FiliereId,
           semestre : this.state.semestre,
           professeur: this.state.professeur
        }
        axios.post("/module/add", ModuleData, {
        }).then(res => {
            console.log('res '+res.data["id"])
           

        
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

    handleChange2 = (e) => {
       
        this.setState({ professeur : e.target.value });
      };


      renderCountry = prof => {
      /*  const { search } = this.state;
        var code = country.code.toLowerCase();
    */
        /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
            return null
        }*/
    
        return (
          <div className="col-md-3" style={{ marginTop: "20px" }}>
            <Card>
              <CardBody>
                <p className="">
                 
                </p>
                <CardTitle>
                  {prof.nom.substring(0, 15) +' '+ prof.prenom}
                  {prof.nom.length > 15 && "..."}
                </CardTitle>
              </CardBody>
            </Card>
          </div>
        );
      };





      onChange = e => {
       
        const userInput = e.currentTarget.value;
    
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = this.state.professeurs.filter(
          professeur =>
            professeur.nom.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput: e.currentTarget.value
        });
      };














       // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };











      onClick = (e) => {
        // Update the user input and reset the rest of the state
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: e.currentTarget.innerText
        });
    
    //  console.log('id est: '+e.currentTarget.innerText.substring(0, e.currentTarget.innerText.indexOf('.')));
 
    console.log('id est'+e.target.getAttribute("data-index"))
      };




      renderCountry2 = prof => {
        /*  const { search } = this.state;
          var code = country.code.toLowerCase();
      */
          /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
              return null
          }*/
          let suggest = [];
        
          const {
            onChange,
            onClick,
            onKeyDown,
            state: {
              activeSuggestion,
              filteredSuggestions,
              showSuggestions,
              userInput
            }
          } = this;
      
          let suggestionsListComponent;
          if (showSuggestions && userInput) {
        
            if (filteredSuggestions.length) {
              suggestionsListComponent = (<ul class="suggestions">
              {filteredSuggestions.map((prof, index) => {
                let className;
  
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
  
                return (
                  <li
                    className={className}
                    key={prof}
                    onClick={onClick}
                    data-index={prof.id}
                  >
                    {prof.nom+' '+prof.prenom}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>Aucun professeur!</em>
            </div>
          );
        }
    }
          
          return (
            
  /*      
    <Autocomplete
        suggestions={suggest}
       
       
      />        
    */    
   
   <Fragment>
   <input
     type="text"
     placeholder="Ecrire le nom ou prenom"
     onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
   />
    <ul class="suggestions">
    {
  suggestionsListComponent
    }
    </ul>
               
 </Fragment>
         
          );
        };
  

        









    render() {
        const filteredCountries = this.state.professeurs.filter(prof => {
            return prof.nom.toLowerCase().indexOf(this.state.professeur.toLowerCase()) !== -1;
          });
        

        return (
            <div className="container ">
                <br></br>             
     
           
<br></br>  
                   <div class="row justify-content-center">
            <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Ajouter Module</div>
                        <div className="card-body">
               
                {/* <div className="row"> */}
                    <form onSubmit={this.onSubmit}>
                        
    
        
                        <div className="form-group w-80">{this.choix_departement()} </div>
                 
                        <div className="form-group w-80">{this.choix_semestre()} </div>



                        
                     {/*   <div className="col">
                <Input
                  label="Search Country"
                  icon="search"
                  onChange={this.handleChange2}
                />
              </div>
        */}
        
         { /*   <select className="custom-select" id="inputGroupSelect01" 
            >
              {filteredCountries.map(prof => {
                return this.renderCountry2(prof);
              })}
              </select>
           
            */}





 











 {/* début row */}
                        <div className="form-row ">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <label htmlFor="nom">Intitule :</label>
                            <input
                            type="text"
                            className="form-control"
                            name="intitule"
                            placeholder="Entrer l'intitule du module"
                            value={this.state.intitule}
                            onChange={this.handleChange} />
                        </div>
                       </div>

                     

                         {/*fin column  */}
                            </div>
{/* fin row */}
                     




{/* début row */}
<div className="form-row justify-content-center">
                             {/*debut column */}
                        <div className="col-md-6">
                        <div className="md-form form-group">
                        <label htmlFor="nom">choisir professeur :</label>
                        {this.renderCountry2(this.state.professeurs)}
                        </div>
                       </div>

                     

                         {/*fin column  */}
                            </div>
{/* fin row */}
                     

                        
                                 
<br></br>
                        
                        
                      
                            
                        
                        <div className="col-md-6 offset-md-3">
                            <button className="btn btn-outline-primary" type="submit">Ajouter</button>
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

    choix_semestre(){
        return(
<div className="input-group mb-3" align="center">
            <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Semestre</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" 
            onChange={(e) => this.setState({ semestre: e.target.value  })}>
                <option value=" ">choisir semestre</option> 
                <option value="1">Premier semestre</option>
                <option value="2">Deuxieme semestre</option>
                           </select>

            {console.log('valeur'+ this.state.semestre)}
          </div>
        ) ;
    }


}


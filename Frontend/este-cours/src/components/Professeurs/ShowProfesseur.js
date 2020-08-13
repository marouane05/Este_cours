import React, { Component } from 'react'
import ProfesseurList from './ProfesseurList'
import axios from 'axios';

export default class ShowProfesseur extends Component {

    state = {
        professeurs : [] ,
        find_departement : ''
    }
        componentDidMount(){
            
            axios.get(`/professeur/All`)
          .then(res => {
            const professeurs = res.data;
            this.setState({ professeurs });
          })
        }


    render() {
        return (
            <div>
                 <h3 align="center">Cours List</h3>
                    
                    <tr>
                    <td>
                        <div>{this.choix_departement()}</div> 
                    </td> 
                    </tr>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">nom</th>
                            <th scope="col">prenom</th>
                  
                            <th scope="col">email</th>
                            <th scope="col">Tele</th>
                            <th scope="col">Departement</th>
                            <th scope="col">Action</th>
                            </tr> 
                        </thead>  
                        
                        <tbody> 
                          
                            {//this.etudiantParFiliere(this.state.find_filiere)
                this.state.professeurs.map(professeur =>
                    professeur.depatement === this.state.find_departement ?
                    <ProfesseurList obj={professeur} key={professeur.id} /> : <td></td>)}

                        </tbody>
                     </table>
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
            onChange={(e) => this.setState({ find_departement: e.target.value  })}>
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

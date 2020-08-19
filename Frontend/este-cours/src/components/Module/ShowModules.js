import React, { Component } from 'react'
import ModuleList from './ModuleList'
import axios from 'axios';
export default class ShowModules extends Component {
    state = {
        modules : [] ,
        find_filiere : ''
    }
        componentDidMount(){
            
            axios.get(`/module/All`)
          .then(res => {
            const modules = res.data;
            this.setState({ modules });
          })
        }
       /* moduleParFiliere(fil) {
           
        console.log('filiere c est'+fil);
            this.state.modules.map(module => 
           module.FiliereId == fil ?
            <moduleList obj={module}  /> : <td></td>)
            
           
         }
    */
    
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
                                <th scope="col">Intitule</th>
                                <th scope="col">Semestre</th>
                        
                                <th scope="col">Action</th>
                                </tr> 
                            </thead>  
                            
                            <tbody> 
                                {//this.moduleParFiliere(this.state.find_filiere)
                    this.state.modules.map(module =>
                        module.FiliereId == this.state.find_filiere ?
                        <ModuleList obj={module} key={module.id} /> : <td></td>)
                                
                                }
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
                onChange={(e) => this.setState({ find_filiere: e.target.value  })}>
                    <option value=" ">choisir filiere</option> 
                    <option value="1">GI1</option>
                    <option value="2">GI2</option>
                    <option value="3">ISIL</option>
                    <option value="4">GODT1</option>
                    <option value="5">GODT2</option>
                    <option value="6">IDSF 1</option>
                    <option value="7">Environnement 1</option>
                    <option value="8">ER1</option>
                    <option value="9">ER2</option>
                    <option value="10">ERDD</option>
                    <option value="11">TM1</option>
                    <option value="12">TM2</option>
                    <option value="13">MBF</option>
                    <option value="14">Management Trourisme</option>
                </select>
              </div>
            ) ;
        }
    
}

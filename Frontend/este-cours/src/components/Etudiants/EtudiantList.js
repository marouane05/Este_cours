import React, { Component } from 'react'
import axios from 'axios';

export default class EtudiantList extends Component {
    constructor(props){
        super(props);
       this.delete= this.delete.bind(this);
    }


    delete(etudiantId) {
           axios.delete(`/etudiant/${etudiantId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);})
              .catch(err => console.log(err));
               window.location.reload();
          }

    render() {
        return (
      
        <tr>
                <td>{this.props.obj.nom}</td>

                <td>{this.props.obj.prenom} </td>

                <td>  {this.props.obj.cne}</td>

        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.FiliereId}</td>

                 <td>  <button  onClick={(e) => this.delete(this.props.obj.id)} className="btn btn-danger">Delete</button> </td> 
        
            </tr>
        
        )
    }
}

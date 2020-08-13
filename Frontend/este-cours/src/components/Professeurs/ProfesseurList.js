import React, { Component } from 'react'
import axios from 'axios';

export default class ProfesseurList extends Component {

    constructor(props){
        super(props);
       this.delete= this.delete.bind(this);
    }


    delete(professeurId) {
           axios.delete(`/professeur/${professeurId}`)
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



<td>{this.props.obj.email}</td>
<td>{this.props.obj.tele}</td>
<td>{this.props.obj.depatement}</td>

 <td>  
     <button onClick={(e) => {
      e.preventDefault();
      window.location.href=`/professeur/update/${this.props.obj.id}`;
      }} class="btn btn-secondary">Modifier</button>
     <button  onClick={(e) => this.delete(this.props.obj.id)} className="btn btn-danger">Supprimer</button>
       
  </td> 
 </tr>
        )
    }
}

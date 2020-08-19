import React, { Component } from 'react'
import axios from 'axios';

export default class ModuleList extends Component {
   
    constructor(props){
        super(props);
       this.delete= this.delete.bind(this);
    }


    delete(moduleId) {
           axios.delete(`/module/${moduleId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);})
              .catch(err => console.log(err));
               window.location.reload();
          }

    render() {
        return (
      
        <tr>
                <td>{this.props.obj.intitule}</td>

                <td>Semestre {this.props.obj.id_semestre}</td>

        {/*<td>{this.props.obj.FiliereId}</td> */}

                 <td>  
        <button  onClick={(e) => this.delete(this.props.obj.id)} className="btn btn-danger">Delete</button> </td> 
        
            </tr>
        
        )
    }
}

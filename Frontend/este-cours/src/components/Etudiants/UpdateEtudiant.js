import React, { Component } from 'react';
import FormEtudiant from './FormEtudiant'
import axios from 'axios';

export default class UpdateEtudiant extends Component{

    state = {
        etudiant : [] ,
        find_departement : '',
        champsId : this.props.match.params.etudiantId
    }

       componentDidMount() {
      //  const { handle } = this.props.match.params
      let id = this.state.champsId
            axios.get(`/etudiant/${id}`)
            .then(res => {
                    const etudiant = res.data;
                    this.setState({ etudiant });
                    console.log('result : '+res.data)
                })
              .catch(err => console.log(err));
    }

  /*  handleSubmit(data) {
       
       axios.put(`/etudiant/${this.props.id}`,data,{})
            .then((data) => {
                this.setState(state => {
                    state.etudiant = data;
                    return state;
                });
            })
              .catch(err => console.log(err));
    }
*/
    render() {
        return (
            <div>
                {console.log('result 2 : '+this.state.etudiant)}
                
                {this.state.etudiant != null ? <FormEtudiant 
                      obj={this.state.etudiant}  ></FormEtudiant> : <div> anything </div> }
            </div>
        );
    }
};


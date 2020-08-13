import React, { Component } from 'react';
import FormProfesseur from './FormProfesseur'
import axios from 'axios';

export default class UpdateProfesseur extends Component{

    state = {
        professeur : [] ,
        find_departement : '',
        champsId : this.props.match.params.professeurId
    }

       componentDidMount() {
      //  const { handle } = this.props.match.params
      let id = this.state.champsId
            axios.get(`/professeur/${id}`)
            .then(res => {
                    const professeur = res.data;
                    this.setState({ professeur });
                    console.log('result : '+res.data)
                })
              .catch(err => console.log(err));
    }

  /*  handleSubmit(data) {
       axios.put(`/professeur/${this.props.params.professeurId}`,data,{})
            .then((data) => {
                this.setState(state => {
                    state.professeur = data;
                    return state;
                });
            })
              .catch(err => console.log(err));
    }
*/
    render() {
        return (
            <div>
                {console.log('result 2 : '+this.state.professeur)}
                
                {this.state.professeur != null ? <FormProfesseur 
                      obj={this.state.professeur}  ></FormProfesseur> : <div> anything </div> }
            </div>
        );
    }
};


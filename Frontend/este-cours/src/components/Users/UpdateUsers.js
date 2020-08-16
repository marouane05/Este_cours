import React, { Component } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader,Fade } from 'reactstrap';



export default class UpdateUsers extends Component{

    constructor(props) {
        super(props);

        this.state = {
        users : [] ,
        id:'',
        username:'',
        email : '',
        type :'',
        password :'',
        find_departement : '',
        champsId : this.props.match.params.usersId ,
        checked : false ,
        firstPassword : '',
        ConfirmedPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

       componentDidMount() {
      //  const { handle } = this.props.match.params

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
       
        axios.post(`/users/profile`, {
           id : decoded.id
        })
        .then(res => {
            const users=[]
         let  users1 = res.data 
         users["id"] = res.data["id"]
          users["username"]= res.data["username"]
          users["email"]= res.data["email"]
          users["type"]= res.data["type"]
         console.log('type '+ res.data["type"]) 

          if(res.data["type"]=="etudiant"){
          axios.get(`/etudiant/detail/${res.data["id"]}`).then(res=>{
            users["tele"]= res.data["tele"]
            users["IdPersonal"] = res.data["id"]
       
        console.log('tableau'+res.data["tele"])
         this.setState({  users });
          })
                                        }

   else if (res.data["type"]=="professeur"){
    axios.get(`/professeur/detail/${res.data["id"]}`).then(res=>{
        users["tele"]= res.data["tele"]
        users["IdPersonal"] = res.data["id"]
    })
   
}     

        }
      )
    }

  /*  handleSubmit(data) {
       axios.put(`/users/${this.props.params.usersId}`,data,{})
            .then((data) => {
                this.setState(state => {
                    state.users = data;
                    return state;
                });
            })
              .catch(err => console.log(err));
    }
*/
handleChange(e){
    e.preventDefault()
 /*   const {name , value} = e.target
    this.setState({ [name]: value });
   */
     let users= this.state.users ;
     this.setState({
         users
    }) ;
    
     users[e.target.name]= e.target.value ;
}



handleSubmit(e) {
    e.preventDefault();
console.log(' id of user'+this.state.users.id + 'checked value '+this.state.checked)

    let data = []
    const Personaldata = {
        email : this.state.users.email,
        tele : this.state.users.tele ,
        sender : 'notAdmin'
    }

    if(this.state.checked == false) {
    data = {

email : this.state.users.email,
username : this.state.users.username,
tele : this.state.users.tele ,
 

    }
    console.log(' data without pass '+ data.email) 
    
    } else {
    
    data = {

        email : this.state.users.email,
        username : this.state.users.username,
        tele : this.state.users.tele ,
        password : this.state.ConfirmedPassword
        
            }
            console.log('data with pass '+ data.email) 
    }


              axios.put(`/users/${this.state.users.id}`,data,{})
                .then(res => {
            
            console.log('result update'+ res.data) 
                     })
                    .catch(err => console.log(err));



    if( this.state.users.type == 'etudiant') {
    axios.put(`/etudiant/${this.state.users.IdPersonal}`,Personaldata,{})
    .then(res => {
       
       console.log('result update'+ res.data) 
    })
      .catch(err => console.log(err));
    } else if(this.state.users.type == 'professeur'){
    axios.put(`/professeur/${this.state.users.IdPersonal}`,Personaldata,{})
    .then(res => {
       
       console.log('result update'+ res.data) 
    })
      .catch(err => console.log(err));
    }    


 
 }



 filterCompleted = event => {
    if(event.target.checked){
      this.setState({
          checked : true ,
      })
    } else {
      this.setState({
          checked : false , 
      })
    }
 }



    render() {
        return (
          
                  <div className="container ">
            <br></br>             
        
       
<br></br>  
               <div className="row justify-content-center">
        <div className="col-md-8">
                <div className="card ">
                    <div className="card-header">Modifier Mon Compte</div>
                    <div className="card-body">
                    
              <form  onSubmit={this.handleSubmit} >
             
             

{/* début row */}
<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8 ">
                    <div className="md-form form-group">
                    <label htmlFor="nom">username :</label>
                        <input
                        type="text"
                        className="form-control"
                        name="username"
                                   value={this.state.users.username}
                                   onChange={this.handleChange}
                        />
                    </div>
                   </div>
                   </div>
                   
{/* fin row */}



{/* début row */}
<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                    <label htmlFor="nom">Email :</label>
                        <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.users.email}
                        onChange={this.handleChange} />
                    </div>
                   </div>
                   </div>
                   
{/* fin row */}



{/* début row */}
<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                    <label htmlFor="nom">Téléphone :</label>
                        <input
                        type="text"
                        className="form-control"
                        name="tele"
                        value={this.state.users.tele}
                                   onChange={this.handleChange} />
                    </div>
                   </div>
                   </div>
                   
{/* fin row */}






<br></br>

{/* début row */}
<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                    
<div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"  onChange={this.filterCompleted} />
    <label className="form-check-label" for="exampleCheck1">Changer mon mot de passe</label>
  </div>
                    </div>
                   </div>
                   </div>
                   
{/* fin row */}



{/* début row */}
{ this.state.checked == true ?
<div>
<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                    
                        <input
                        type="password"
                        className="form-control"
                        name="firstPassword"
                        placeholder="Nouveau mot de passe"
                      
                                   onChange={(e)=> { this.setState({
                                       firstPassword : e.target.value
                                   })}} />
                    </div>
                   </div>
                   </div>

<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                    
                        <input
                        placeholder="confirmation"
                        type="password"
                        className="form-control"
                        name="ConfirmedPassword"
                        onChange={(e)=> { this.setState({
                            ConfirmedPassword : e.target.value
                        })}} />
                    </div>
                   </div>
                   </div>
                   </div>
: <div> <br></br></div> }
                   
{/* fin row */}




                  

                   

                      



<br></br>
{ this.state.checked == false || (this.state.checked == true & this.state.ConfirmedPassword == this.state.firstPassword ) ?
                    <div className="col-md-6 offset-md-3">
                    <button type="submit"
                                    id="blog_post_submit"
                                    className="btn-default btn">
                                Enregistrer
                            </button>
                    </div> : <div></div>
    }             

{<div className="form-row justify-content-center">
                         {/*debut column */}
                    <div className="col-md-8">
                    <div className="md-form form-group">
                        
    <div className="p-2 bg-success my-4 rounded" >
        <Toast>
          <ToastHeader>
           Success 
          </ToastHeader>
          <ToastBody>
            Vos données sont modifiés avec succes !
          </ToastBody>
        </Toast>
      </div></div></div></div>}
            </form>
          
            </div>
            </div>
            </div>
            </div>
            
            </div>
            
        );
    }



};

Toast.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string, // default: 'success'
    isOpen: PropTypes.bool,  // default: true
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // Controls the transition of the toast fading in and out
    // See Fade for more details
    transition: PropTypes.shape(Fade.propTypes),
  }
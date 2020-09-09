import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import  '../styles/ProfilePage.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      users : [],
      errors: {}
    }
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
        localStorage.setItem('type',res.data["type"])
       console.log('type '+ res.data["type"]) 

        if(res.data["type"]=="etudiant"){
        axios.get(`/etudiant/detail/${res.data["id"]}`).then(res=>{
          users["tele"]= res.data["tele"]
          users["IdPersonal"] = res.data["id"]
          users["nom"] = res.data["nom"]
          users["prenom"] = res.data["prenom"]
          users["naissance"] = res.data["naissance"].substring(0,10)
          users["cne"] = res.data["cne"]
          localStorage.setItem('filiere',res.data["FiliereId"])
          localStorage.setItem('identification',users["IdPersonal"])
          localStorage.setItem('nom',''+users["nom"]+''+users["prenom"])
      
       this.setState({  users });
        })
                                      }

 else if (res.data["type"]=="professeur"){
  axios.get(`/professeur/detail/${res.data["id"]}`).then(res=>{
      users["tele"]= res.data["tele"]
      users["IdPersonal"] = res.data["id"]
      users["nom"] = res.data["nom"]
          users["prenom"] = res.data["prenom"]
          users["naissance"] = res.data["naissance"].substring(0,10)
      
          localStorage.setItem('identification',users["IdPersonal"])
          localStorage.setItem('nom',''+users["nom"]+''+users["prenom"])
      this.setState({  users });
  })
 
}     

      }
    )
  }




  render() {
    return (
      /*
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Bienvenue</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>{this.state.users.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.users.email}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{this.state.users.type}</td>
              </tr>
              <tr>
                <td>nom</td>
                <td>{this.state.users.nom}</td>
              </tr>
              <tr>
                <td>prenom</td>
                <td>{this.state.users.prenom}</td>
              </tr>
              <tr>
                <td>tele</td>
                <td>{this.state.users.tele}</td>
              </tr>
              <tr>

              <button onClick={(e) => {
      e.preventDefault();
      window.location.href=`/users/update`;
      }} class="btn btn-secondary">Modifier</button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    */
   <div>
     <div className="container" >
    <div className="main-body">
    
       
    
          <div className="row gutters-sm justify-content-center" >
            <div className="col-md-7">
              
              <div className="card" >
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{this.state.users.nom} {this.state.users.prenom}</h4>
                      <p className="text-secondary mb-1">{this.state.users.type} à L'ESTE</p>
                      <p className="text-muted font-size-sm">Ghazoua Essaouira, Maroc</p>
<br></br>
                      <table className="table col-md-7 mx-auto">
            <tbody>
              <tr>
              <div class="col-sm-9 text-secondary">  <td >Username</td> </div>
                    <td>{this.state.users.username}</td> 
              </tr>

            
              {this.state.users.type == "etudiant" ?
           <tr> <div class="col-sm-9 text-secondary">   <td>CNE</td> </div>
                     <td>{this.state.users.cne}</td>
    
    </tr> : <div></div> }
              <tr>
              <div class="col-sm-9 text-secondary">   <td >Email</td> </div>
                <td>{this.state.users.email}</td>
              </tr>
              
              
              <tr>
              <div class="col-sm-9 text-secondary"> <td>tele</td> </div>
                <td>{this.state.users.tele}</td>
              </tr>

              

              <tr>
              <div class="col-sm-9 text-secondary">    <td>Naissance</td> </div>
                <td>{this.state.users.naissance}</td>
              </tr>

              <tr>

              </tr>
            </tbody>
          </table>


<br></br>


                      
                      <button onClick={(e) => {
      e.preventDefault();
      window.location.href=`/users/update`;
      }}  className="btn btn-outline-primary">Modifier</button>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            
          
            
              
            </div>
          </div>
        </div>
    </div>
  
 
      )
  }
}

export default Profile
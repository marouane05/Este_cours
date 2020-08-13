import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id : '',
      username: '',
      email: '',
      type :'',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id : decoded.id , 
      username: decoded.username,
      email: decoded.email,
      type : decoded.type
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{this.state.type}</td>
              </tr>
              <tr>
                <td>Id</td>
                <td>{this.state.id}</td>
              </tr>

              <tr>

              <button onClick={(e) => {
      e.preventDefault();
      window.location.href=`/users/update/${this.props.obj.id}`;
      }} class="btn btn-secondary">Modifier</button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile
import React, { Component } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode'

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
        champsId : this.props.match.params.usersId
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
          users["username"]= res.data["username"]
          users["email"]= res.data["email"]
          users["type"]= res.data["type"]
         console.log('type '+ res.data["type"]) 

          if(res.data["type"]=="etudiant"){
          axios.get(`/etudiant/detail/${res.data["id"]}`).then(res=>{
            users["tele"]= res.data["tele"]
           
       
        console.log('tableau'+res.data["tele"])
         this.setState({  users });
          })
                                        }

   else if (res.data["type"]=="professeur"){
    axios.get(`/professeur/detail/${res.data["id"]}`).then(res=>{

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



handleSubmit() {

    const data = {

email : this.state.users.email,
username : this.state.users.username,
type : this.state.users.type ,
 

    }
    
    axios.put(`/users/${this.state.users.id}`,data,{})
         .then(res => {
            
            console.log('result update'+ res.data) 
         })
           .catch(err => console.log(err));
 }


    render() {
        return (
            <div>
              <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="blog_post">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="nom">Username</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_title"
                                   required="required"
                                   name="username"
                                   value={this.state.users.username}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="email"
                                   id="blog_post_body"
                                   required="required"
                                   value={this.state.users.email}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">password</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="tele"
                                   id="blog_post_body"
                                   required="required"
                             
                                   value={this.state.users.tele}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="type"
                                   id="blog_post_body"
                                   required="required"
                                
                                   value={this.state.users.type}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>

                   

                      



                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit"
                                    id="blog_post_submit"
                                    className="btn-default btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        );
    }
};


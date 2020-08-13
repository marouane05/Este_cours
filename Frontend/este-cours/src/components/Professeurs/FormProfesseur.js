
import React, { Component } from 'react';
import axios from 'axios';

export default class FormProfesseur extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id : '',
            depatement :'' ,
            nom :'',
            prenom : '',
           
            naissance: '',
            tele :'',
            email :'', 
         
          
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState( props.obj);
    }

   /* handleBodyChange(e) {
        this.setState({
            body: e.target.value
        });
    },

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    },
*/



handleChange(e){
    e.preventDefault()
    const {name , value} = e.target
    this.setState({ [name]: value });
    // let fields= this.state.fields ;
    // this.setState({
    //     fields 
    // }) ;
    
    // fields[e.target.name]= e.target.value ;
}
    handleSubmit(e) {
       e.preventDefault();
     /*    this.props.onSubmit(this.state);
     */
    const data ={
        id : this.state.id , 
        nom :this.state.nom,
        prenom :this.state.prenom,
        
        naissance:this.state.naissance,
        tele :this.state.tele,
        email :this.state.email, 
      
        departement : this.state.departement


    }
    axios.put(`/professeur/${this.state.id}`,data,{})
    .then((data) => {
        this.setState(state => {
            state.professeur = data;
            return state;
        });
    })
      .catch(err => console.log(err));

    }

    render() {
        return (
            <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="blog_post">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="nom">Title</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_title"
                                   required="required"
                                   name="nom"
                                   value={this.state.nom}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="prenom"
                                   id="blog_post_body"
                                   required="required"
                                   value={this.state.prenom}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="depatement"
                                   id="blog_post_body"
                                   required="required"
                                
                                   value={this.state.depatement}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                             name="tele"
                                   id="blog_post_body"
                                   required="required"
                                
                                   value={this.state.tele}
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
                                
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   className="form-control"/>
                        </div>
                    </div>

                        <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        
                        <div className="col-sm-10">
                            <input type="text"
                                   
                                   name="naissance"
                                   id="blog_post_body"
                                   required="required"
                                
                                   value={this.state.naissance}
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
        );
    }
};


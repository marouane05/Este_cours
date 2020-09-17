import React, { Component ,Fragment} from 'react'
import { login } from './UserFunctions'
import '../styles/LandingStyle.css'
import { Link } from 'react-router-dom';
import { Row,Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import HomeBg from '../images/home-2-bg.png'
import EsteLogo1 from '../icons/estelogo1.png'
import EstImage from '../icons/est-essaouira2.jpg'
import Homr from '../icons/homr.png'
import Homr2 from '../icons/homr2.png'

import confirm, { Button as ButtonAlert, alert } from "react-alert-confirm";
 class Login extends Component {
    constructor() {
        super()
        this.state = {
            email : '',
            password : '',
            message :''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
            this.setState({[e.target.name] : e.target.value});
    }

    Authentifier=()=>{

  
        confirm({
            title:    <h1 className="h3 mb-3 font-weight-normal">Se connecter</h1>,
            content: (
              <Fragment>
              
              <form noValidate >
                        
                            <div className="form-group">
                                <label htmlFor="email">Email </label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                   
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                   
                                    onChange={this.onChange} />
                            </div>
                            {/* <div className="alert alert-danger"
                                style={{ visibility: this.state.error !== '' ? 'visible' : 'hidden' }}>
                                {this.state.error}
                            </div> */}
                         
                        </form>

              </Fragment>
            ),
            lang: "en",
            onOk: () => {
            
                const user = {
                    email : this.state.email,
                    password : this.state.password,
                }
                    login(user).then(res => {
                    if(res ) {
    
                        if(res !="User does'nt exists"){
    
                            this.props.history.push('/profile')
                        } else {
                            alert(
                                <h1 className="h3 mb-3 font-weight-normal" style={{ color: "red"}}>Les informations incorrectes</h1> 
                              )
                        }
                      
                        
                    }else{
                        alert(
                             <h1 className="h3 mb-3 font-weight-normal" style={{ color: "red"}}>Les informations incorrectes</h1> 
                           )
                    }
                    
                    })



            },
            onCancel: () => {
              console.log("cancel");
            }
          });
        

    }

    onSubmit(e){
            e.preventDefault()

            const user = {
                email : this.state.email,
                password : this.state.password,
            }
                login(user).then(res => {
                if(res ) {

                    if(res !="User does'nt exists"){

                        this.props.history.push('/profile')
                    } else {
                        alert("User does'nt exists")
                    }
                  
                    
                }else{
                    alert("problem!")
                }
                
                })
            
            
    }
    render(){
        return(
        

                    <div>    <Fragment> 
                        <section className="section home-2-bg" id="home">
                            <div className="home-center">
                                <div className="home-desc-center">
                                    <div className="container">
                                        <Row className="align-items-center">
                                            <Col lg="5">
                                                <div className="mt-40 home-2-content">
                                                    <h1 className="text-white font-weight-normal home-2-title display-4 mb-0">Plateforme des cours EST ESSAOUIRA.</h1>
                                                    <p className="text-white-70 mt-4 f-15 mb-0">Notre système a pour le but de suivre l'innovation technologique en donnant la possibilité aux professeurs et les étudiants de suivre l'opération d'apprentissage à distance.</p>
                                                    <div className="mt-5">
                                                        <button onClick={()=>this.Authentifier()} className="btn btn-custom mr-4">Commencer</button>
                                                    </div>
                                                </div>
                                            </Col>
        
                                            <Col lg="7">
                                                <div className="mt-40 home-2-content position-relative">
                                                    <img src={Homr2} alt="" className="img-fluid mx-auto d-block home-2-img mover-img" />
                                                    <div className="home-2-bottom-img">
                                                        <img src={Homr} alt="" className="img-fluid d-block mx-auto" />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </section>
                        </Fragment> 
                        


                        
                        <React.Fragment>
                <section className="footer-bg">
                    <div className="container">
                        <Row>
                            <Col lg="4">
                                <div className="mb-5">
                                    <p className="text-uppercase text-dark footer-title mb-4">à Propos</p>
                                    <p className="text-muted f-14">Ce site est accessible juste aux étudiants et professeurs de l'Est essaouira.</p>
                                </div>
                            </Col>

                          
                                    <Col lg="4" >
                                        <div className="mb-5">
                                            <p className="text-uppercase text-dark footer-title mb-4">Réalisateur</p>
                                            <ul className="list-unstyled footer-sub-menu">
                                                <li className="f-14">Dryouch Marouane (lauréat Lp Isil à l'Este 2020)</li>
                                                <li className="f-14">contact : dryouch.marouane@gmail.com</li>
                                            </ul>
                                        </div>
                                    </Col>

                                    <Col  lg="4">
                                        <div className="mb-5">
                                            <p className="text-uppercase text-dark footer-title mb-4">Encadrant</p>
                                            <ul className="list-unstyled footer-sub-menu">
                                                <li className="f-14">Mr. Fahd Karami (Professeur Universitaire à l'Este)</li>
                                                <li className="f-14">contact : fa.karami@uca.ac.ma</li>
                                            </ul>
                                        </div>
                                    </Col>

                               
                              
                        </Row>
                    </div>
                </section>
            </React.Fragment>
                        




            <React.Fragment>
                <section className="footer-alt bg-dark pt-3 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <p className="copyright text-white f-14 font-weight-light mb-0"> {new Date().getFullYear()} © Est Essaouira. </p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>


                        </div>
        )

    }
}
export default Login;

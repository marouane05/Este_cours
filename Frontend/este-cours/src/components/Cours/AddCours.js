import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import ModuleSelection from './ModuleSelection'
import Select from 'react-select';
import '../../styles/Upload.css'
/*const options = [
    
     ];
*/
export default class AddCours extends Component {
 constructor(){
     super()
    this.state={
        intitule :'',
        description : '',
        path :'',
        filiere :'',
        modules :[],
        prof:'',
        moduleChoisi : null,
        FiliereCours :'',
        ModuleCours :'',
        IntituleCours :'',
        myArr : [] , 
        cours : '',
        selectOptions : [],
 }
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
 }   
 

 
 onFileChange(e) {
    this.setState({ cours: e.target.files[0] })
}

onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
  
    
   
  formData.append('file' , this.state.cours)
const CoursDetail ={
    intitule : this.state.intitule ,
    filiere : this.state.FiliereCours,
    professeur : localStorage.identification ,
    module : this.state.ModuleCours,
    description : this.state.description,
    url : ''+localStorage.nom+'/'+this.state.IntituleCours ,
}

axios.post('/cours/add',CoursDetail, {
    }).then(res => {
        //this.props.history.push('/All')
console.log('send'+CoursDetail.url)
        axios.post(`/cours/upload/${localStorage.nom}/${this.state.IntituleCours}`,formData, {
        }).then(res => {
            //this.props.history.push('/All')
            console.log(res)
        }) 

        

        console.log(''+res)
    }) 


   /* axios.post("http://localhost:4000/cours/addCour", formData, {
    }).then(res => {
        //this.props.history.push('/All')
        console.log(res)
    }) */
}
handleChange = (e) =>{
    e.preventDefault()
    const {name , value} = e.target
    this.setState({ [name]: value  });
    // let fields= this.state.fields ;
    // this.setState({
    //     fields 
    // }) ;
    
    // fields[e.target.name]= e.target.value ;
}




componentDidMount(){

const id = localStorage.identification
axios.get(`/module/All`).then(res=>{
const modules = res.data 
const options = res.data.map(d => ({
    "label" : d.intitule+ ' ( Semestre '+d.id_semestre +')',
    "id" : d.id ,
    "idF" : d.FiliereId ,
    "intit" : d.intitule
    
  }))
  this.setState({
    selectOptions : options
})
 this.setState({
     modules 
 })
        }) .catch(error => {});


        
}




/*handleChange2 = moduleChoisi => {
    this.setState({ moduleChoisi });
    console.log(`Option selected:`, moduleChoisi);
  };
*/

handleChange2(e){
    this.setState({ModuleCours:e.id, FiliereCours:e.idF , IntituleCours : e.intit})
    console.log(`Option selected:`,this.state.FiliereCours);
   }

   


    render() {
      

      return (
            
            
      
        <div className="container ">
        <br></br>             
    
   
<br></br>  
           <div class="row justify-content-center">
    <div className="col-md-8">
            <div className="card">
                <div className="card-header">Ajouter un Cours</div>
                <div className="card-body">




         
                    <form onSubmit={this.onSubmit}>
                        
                    <div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        
                 
                        <label htmlFor="Intitule">Merci de choisir un de vos modules:</label>
                        {
            <Select
      //  value={moduleChoisi}
        onChange={this.handleChange2.bind(this)}
        options={this.state.selectOptions}
      />

          }
           

</div>
</div>
</div>


<div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <label htmlFor="Intitule">Intitule :</label>
                            <input
                            type="text"
                            className="form-control"
                            name="intitule"
                            placeholder="Entrer un intitule pour le cours"
                            value={this.state.intitule}
                            onChange={this.handleChange} />
                        </div>

</div>
</div>


                        <div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <div className="form-group files">
                            <input type="file" 
                             onChange={this.onFileChange}  className = "form-control"/>
                        </div>
                        </div>
                        </div>
                        </div>

                        

<div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <label htmlFor="email">Déscription :</label>
                                <textarea name="description"
                                        type ="text"
                                      placeholder="faire une description de cours"
                                       className = "form-control"
                                       value = {this.state.description}
                                       onChange = {this.handleChange} 
                                />
                        </div>
                        </div>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                {/* </div> */}
            </div>
            
</div>
</div>
</div>
</div>

            
            
           
        )
    }


   

}

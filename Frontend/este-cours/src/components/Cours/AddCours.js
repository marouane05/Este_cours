import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
//import ModuleSelection from './ModuleSelection'
import Select from 'react-select';
//import '../../styles/Upload.css';
//import {DropZone} from 'react-dropzone-uploader'
//import 'react-dropzone-uploader/dist/styles.css'
//import FineUploaderTraditional from "fine-uploader-wrappers";
//import Gallery from "react-fine-uploader";
import {Progress} from 'reactstrap';
//import "react-fine-uploader/gallery/gallery.css";
import Button from '@material-ui/core/Button';
import {DropzoneDialog, DropzoneArea} from 'material-ui-dropzone'

import ReactFileReader from 'react-file-reader';
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
       
        CoursOptions : [],
        base64:'',
        loaded:0 ,
        isLoaded : false ,
        open: false,
        files: [] ,
        tabBase64 : [],
        courses : [] ,
        typeCours : '',
 }
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
 }   
 




 
 onFileChange(e) {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  let file = e.target.files[0]
  reader.onloadend = (file) => {
    this.setState({
      cours: file,
      base64: reader.result
    });
  };

}






onSubmit(e) {
    e.preventDefault()
   // const formData = new FormData()
  
    console.log('longueur base64: '+this.state.tabBase64[0])
    console.log('longueur Files: '+this.state.courses.length)
 // formData.append('file' ,this.state.cours)
const CoursDetail ={
    intitule : this.state.intitule ,
    filiere : this.state.FiliereCours,
    professeur : localStorage.identification ,
    module : this.state.ModuleCours,
    description : this.state.description,
    typeCours : this.state.typeCours,
    url : ''+localStorage.nom+'/'+this.state.IntituleCours ,
}




axios.post('/cours/add',CoursDetail, {
    }).then(res => {
        //this.props.history.push('/All')
console.log('send'+CoursDetail.url)


//console.log('base: '+this.state.base64)

     axios.post(`/cours/uploads/${this.state.typeCours}/${localStorage.nom}/${this.state.IntituleCours}/${this.state.intitule}`,{
       pdf : this.state.tabBase64 , 
     }
   ,{
    onUploadProgress: ProgressEvent => {
      this.setState({
        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        isLoaded : true
    })
    
},

    
   }).then(res => {
            //this.props.history.push('/All')
        if(this.state.loaded==100){   
          setTimeout(() => {
            window.location.reload()
          }, 4000);
                       console.log(res)
        }
                      }) 


  
  
      






        

       
    }) 
 
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


handleChange3(e){
    this.setState({typeCours : e.cours})
    console.log(`Option selected:`,this.state.typeCours);
 }



   handleFiles = files => {
    this.setState({ cours: files[0] })
    console.log(files)
  }  

  //**************** New  */

  handleClose() {
    this.setState({
        open: false
    });
}

handleSave(files) {
    //Saving files to state for further use and closing Modal.
  
    let file = []
    let filesData = []
    let Base64Tab = []
    for(let i=0;i < files.length ; i++){
      let reader = new FileReader();
      console.log('size '+files.length)
      reader.readAsDataURL(files[i]);
      file[i] = files[i]
      var fileRecu = file[i];
      reader.onloadend =(fileRecu) =>{
filesData[i] = fileRecu ;
Base64Tab[i] = reader.result

      }
/*this.state.courses[i] = filesData[i]
this.state.tabBase64[i]= Base64Tab[i]
    */  }
   
    
this.setState({
  courses : filesData,
  tabBase64 : Base64Tab
})



    this.setState({
        files: files,
        open: false ,
       
    });
}

handleOpen() {
    this.setState({
        open: true,
    });
}


renderSwitch(param) {
  switch(param) {
    case 'video':
      return  <div> <Button onClick={this.handleOpen.bind(this)}
                
      >
        Ajouter Video (Max 100 Mo)
      </Button>
      <DropzoneArea
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          onChange = {this.handleSave.bind(this)}
       //   acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          acceptedFiles={['video/mp4']}
          showPreviews={false}
          maxFileSize={100000000}
          onClose={this.handleClose.bind(this)}
      />
<Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
     
  </div> ;
    case 'document':
      return   <div>
      <Button onClick={this.handleOpen.bind(this)}
      
      >
        Ajouter Document (Max 100 Mo)  
      </Button>
      <DropzoneArea
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          onChange = {this.handleSave.bind(this)}
       //   acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          acceptedFiles={['application/pdf']}
          showPreviews={false}
          maxFileSize={100000000}
          onClose={this.handleClose.bind(this)}
      />

<Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
  </div> ;  
    default:
      return <div></div>;
  }
}





    render() {
     
      const {
        isValid
      } = this.props
      
      const customStyles = {
        control: (base, state) => ({
          ...base,
          // state.isFocused can display different borderColor if you need it
          borderColor: state.isFocused ?
            '#ddd' : isValid ?
            '#ddd' : 'red',
          // overwrittes hover style
          '&:hover': {
            borderColor: state.isFocused ?
              '#ddd' : isValid ?
              '#ddd' : 'red'
          }
        })
      }
      
      

      return (
            
         
      
        <div className="container ">
 
 
        <br></br>             
    
   
<br></br>  
           <div class="row justify-content-center">
    <div className="col-md-8">
            <div className="card">
                <div className="card-header">Ajouter un Cours</div>
                <div className="card-body">




         
                    <form onSubmit={this.onSubmit} >
                        
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
        styles={ customStyles } {...this.props}
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
                            onChange={this.handleChange}
                            required
                             />
                        </div>

</div>
</div>


                        <div className="form-row">
                             {/*debut column */}
                        <div className="col-md-12">
                        <div className="md-form form-group">
                        <div className="form-group files">
                          {/* <input type="file" 
                             onChange={this.onFileChange}  className = "form-control"/>
        }
      <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
      */}

</div>
</div>
</div>
</div>
      



<Select
required="true"
      //  value={moduleChoisi}
        onChange={this.handleChange3.bind(this)}
        options={[{"cours" :"video", "label": "video"},{"cours" : "document", "label":"document"}]}
        styles={ customStyles } {...this.props}
     
     />

            {this.renderSwitch(this.state.typeCours)}

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
                                       required
                                />
                        </div>
                        </div>
                        </div>

       { this.state.ModuleCours =='' || this.state.typeCours =='' || this.state.files.length == 0 ?
       
<div align="center"> <h  style={{ color: "red",fontSize:"12px"}}>Merci de remplir les cases rouges ou d'importer le cours</h> </div>
:
<div className="form-group" align="center">
 
   <button className="btn btn-primary" type="submit">Upload</button>
         </div>
  

}
    
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

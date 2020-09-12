import React, { Component , Fragment } from 'react'
import { Player } from 'video-react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import '../../styles/VideoReact.css'
import '../../styles/Watch.css'
import 'semantic-ui-css/semantic.min.css'
import {Card} from 'react-bootstrap'
import axios from 'axios';
import iconEdit from '../../icons/iconEdit.png'
import confirm, { Button as ButtonAlert, alert } from "react-alert-confirm";

export default class ShowVideoCours extends Component {

constructor(){
    super();
    this.state={
        commentaire :'' ,
        commentaires : [],
        commentaireEtudiant : [],
        commentUpdated :'',
    }
    this.handleChange = this.handleChange.bind(this)
}


EnvoyerRepCommentaire=(id)=>{

 
confirm({
  title: "Modifier votre commentaire",
  content: (
    <Fragment>
      <Form reply>
      <Form.TextArea 
      name="commentaire"
     // value={this.state.commentaire}
      onChange={(e)=>{
        this.setState({
          commentaire : e.target.value
        })
      }}/>
     
    </Form>

    </Fragment>
  ),
  lang: "en",
  onOk: () => {
    
    const Form = {
      professeur : localStorage.identification,
      repcommentaire : this.state.commentaire ,
      courId : this.props.location.state.id,
      autheur : localStorage.autheur , 
      commentaireId : id ,
  }
  axios.post('/repcommentaire/add',Form,{}).
  then(res=>{
      console.log(res);
      this.setState({
          commentaire : ''
      })
  this.UpdateCommentaires()
   } )
      .catch((err)=>   
      console.log(err))
  


  },
  onCancel: () => {
    console.log("cancel");
  }
});




}

UpdateCommentaires=()=>{

  axios.get(`/repcommentaire/All/${this.props.location.state.id}`)
  .then(res => {
    const commentaires = res.data;
    this.setState({ commentaires });
  })

  axios.get(`/commentaire/All/${this.props.location.state.id}`)
  .then(res => {
    const commentaireEtudiant = res.data;
    this.setState({ commentaireEtudiant });
  })

}






updateMonCommentaire=(id,com)=>{

  confirm({
    title: "Modifier votre commentaire",
    content: (
      <Fragment>
        <div id="blog_post">
        
<div className="form-group">

                        <div className="col-sm-10">
         <textarea type="text"
         className="form-control"
         name="commentUpdated"
        
         placeholder="Ecrire à nouveau"
        // value={this.state.commentUpdated}
         onChange={(e)=>this.setState({
          commentUpdated : e.target.value
        })}
         
                             />
                             </div>
                             </div>
                             </div>
      </Fragment>
    ),
    lang: "en",
    onOk: () => {
      const Form ={
        id: id,
       commentaire : this.state.commentUpdated
      }
      
axios.put(`/repcommentaire/`,Form,{}).then(res=>{
  console.log(res);
  console.log(res.data);
 this.UpdateCommentaires();


}).catch((err)=>console.log(err))
  
  console.log('commentaire'+this.state.commentUpdated)
    },
    onCancel: () => {
      console.log("cancel");
    }
  });



}




deleteCommentaire =(id)=>{
 
    confirm({
      title: "Etes vous sur ?",
      content: "Vous voulez supprimer votre commentaire ",
      footer: (dispatch) => (
        <Fragment>
          <ButtonAlert onClick={() => dispatch("cancel")}>Annuler</ButtonAlert>
          <ButtonAlert onClick={() => dispatch("ok")} styleType="danger">
            oui
          </ButtonAlert>
        </Fragment>
      ),
      closeBefore: (action, close) => {
        if (action === "ok") {
  
          axios.delete(`/repcommentaire/${id}`)
    .then(res => {
        console.log(res);
        console.log(res.data);
      this.UpdateCommentaires();  
      
      })
      .catch(err => console.log(err));
      close();
        
      } else {
          close();
        }
      }
    });
  
  
    
  
  }



componentDidMount=()=>{
  this.UpdateCommentaires()
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






    render() {
        return (
            <div className="bar">
                <br></br><br></br>
                <div className="row justify-content-center">
                <div className="col-md-9">
                    <Card >
  <Card.Body>
<Player
playsInline
poster="/assets/poster.png"
src={'/'+this.props.location.state.url}

        width={900}
        height={300}
/>

<br></br>
    <Card><Card.Body>
<Comment.Group>
    <Header as='h5' dividing>
      Description 
    </Header>
    <Comment><Comment.Content>
    <Comment.Text> 
      {this.props.location.state.description}
      </Comment.Text>
      </Comment.Content> </Comment>
    </Comment.Group>           

</Card.Body>
</Card>  

<Comment.Group>
    <Header as='h3' dividing>
      Commentaires
    </Header>

{this.state.commentaireEtudiant.map((com)=>   
    <Comment>
     <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{com.autheur}</Comment.Author>
        <Comment.Metadata>
<div>{com.createdAt}</div>

        </Comment.Metadata>
        <Comment.Text>{com.Commentaire}</Comment.Text>
        
          
          <Comment.Actions>
          <Comment.Action onClick={()=>this.EnvoyerRepCommentaire(com.id)} >Répondre</Comment.Action>
          </Comment.Actions>
         <Comment.Actions></Comment.Actions>  


      </Comment.Content>


      <Comment.Group>  
        
        {this.ReponseComment(com.id)}

         </Comment.Group>
     
    </Comment>
)}
    
    
  </Comment.Group>
  </Card.Body>
</Card>
</div>
</div>
</div>
        )
    }

ReponseComment=(id)=>{

  {this.state.commentaires.map((comment)=>
    id == comment.commmentaireId  ?
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{comment.autheur}</Comment.Author>
        <Comment.Metadata>
      <div>{comment.createdAt}</div>

        </Comment.Metadata>
        <Comment.Text>{comment.commentaire}</Comment.Text>
        
        
          <Comment.Actions>
          <Comment.Action onClick={()=>this.updateMonCommentaire(comment.id,comment.commentaire)}>Modifier</Comment.Action>
          <Comment.Action
          onClick={()=>this.deleteCommentaire(comment.id)}
          >Supprimer</Comment.Action>
          </Comment.Actions>
      </Comment.Content>

     

    </Comment> : <Comment></Comment>
)}

}    


}




/*
<Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>

  */
import axios  from 'axios'
import jwt_decode from 'jwt-decode'

export const register = newUser => {
    return axios
    .post('/users/register' , {
        fullName : newUser.fullName,
        email : newUser.email,
        password : newUser.password
    })
    .then(res => {
        console.log('registred !');
    })
}

export const login = user => {
    return axios
    .post('users/login' , {
        email : user.email,
        password : user.password
    })
    .then(res => {
       
      if(res.data['error']){
          return "User does'nt exists" ;
      } else {
        localStorage.setItem('usertoken' , res.data);
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        localStorage.setItem('type',decoded.type)
        return res.data;
      }
        
    })
    .catch(err =>{
        console.log(err)
    })
}


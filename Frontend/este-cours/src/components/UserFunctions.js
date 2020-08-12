import axios  from 'axios'

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
        localStorage.setItem('usertoken' , res.data);
     
      if(res.data['error']){
          return "User does'nt exists" ;
      } else {

        return res.data;
      }
        
    })
    .catch(err =>{
        console.log(err)
    })
}
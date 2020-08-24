import React from 'react';
import { Route, Redirect } from 'react-router-dom';


import jwt_decode from 'jwt-decode'

const isLogged =()=>{
   return( localStorage.usertoken ? true : false)  }

   // Pour spécifier le role (etudiant ou prof ou admin)


   export const grantPermission = (requestedRoles) => {
      
       const decoded = jwt_decode(localStorage.usertoken)
  
    const permittedRoles =  decoded.type;
    console.log('type grant'+permittedRoles)
    if (requestedRoles.includes(permittedRoles)) return true 
    else return false ;
  };

  /*export const UnlockAccess = ({ children, request }) => {
    const permission = grantPermission(request); // request = ['ROLE_ADMIN'] / ['ROLE_USER'] / ['ROLE_MANAGER']
    return (
      <>
        {permission && children}
      </>
    );
  };
*/

  const PrivateRoute = ({component: Component,auth, roles,...rest}) => {
     
      
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
             isLogged () ?
             ( grantPermission(roles) ? <Component {...props} /> :<Redirect to="/login" />  )
            : <Redirect to="/login" />
        )} />
    );
};


  export default PrivateRoute;
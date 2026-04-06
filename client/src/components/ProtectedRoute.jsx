import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const navigate=useNavigate()
const IsAuthenticate=JSON.parse(localStorage.getItem("isAuthenticate"));

if (IsAuthenticate) {

console.log(IsAuthenticate);


    return(children)
}else{
    console.log("ok");
    
return <Navigate to={"/admin-login"} replace></Navigate>
}

}

export default ProtectedRoute
import axios from "axios"
import { useNavigate } from "react-router-dom";
const api=axios.create({
    baseURL:"http://localhost:8000"
})

export const SellCar=async(formData)=>{

try {
        const data=await api.post("/sell-car",formData,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}


export const Signup=async(formData)=>{

try {
        const data=await api.post("/user/signup",formData,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}






export const Login=async(formData)=>{

  for (let [key, value] of formData.entries()) {
  console.log("hello",key, value);
}

try {
        const data=await api.post("/user/login",formData,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}









export const CarDetail=async(id)=>{


console.log("id",id);

try {
        const data=await api.get(`/user/detail/${id}`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}








export const FetchNewCars=async()=>{

console.log("called new cars");

try {
        const data=await api.get(`/user/new-cars`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}















export const FetchOldCars=async()=>{


console.log("called new cars");

try {
        const data=await api.get(`/user/old-cars`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}









export const checkAuth=async()=>{

try {
        const data=await api.get(`/user/check-auth`,{withCredentials:true})


    console.log("data",data);


    
    return data;


  } catch (err) {
    if (err.response) {
      // Server responded with error
      console.log('Server Error:', err.response.data.msg);
return err
    } else if (err.request) {
      // Request sent but no response
      console.log('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}






export const FetchSignupUser=async()=>{


console.log("called");

try {
        const data=await api.get(`/user/registerUser`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}






export const FetchCars=async()=>{


console.log("called  cars");

try {
        const data=await api.get(`/user/car_listings`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}








export const DeleteCar=async(id)=>{


console.log("id",id);

try {
        const data=await api.delete(`/user/deleteUser/${id}`,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}







export const UpdateUser=async(formData)=>{


console.log("formUpdateData",formData);

try {
        const data=await api.patch(`/user/updateUser`,formData,{withCredentials:true})


    console.log("data",data);
    return data
} catch (err) {
    if (err.response) {
      // Server responded with error
      console.error('Server Error:', err.response.data.error);
    } else if (err.request) {
      // Request sent but no response
      console.error('No response from server');
    } else {
      console.error('Error:', err.message);
    }    
}
}




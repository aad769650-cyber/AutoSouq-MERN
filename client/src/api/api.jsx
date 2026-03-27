import axios from "axios"
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
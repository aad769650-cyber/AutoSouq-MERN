import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()


 const generateAccessToken=(payload)=>{
    console.log("payload",payload);

    return jwt.sign(payload,process.env.AccessToken)


    
}

 export const generateRefreshToken=(payload)=>{
    console.log("payload",payload);

    return jwt.sign(payload,process.env.RefreshToken)


    
}

export default generateAccessToken
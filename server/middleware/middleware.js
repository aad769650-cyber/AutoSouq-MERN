 export const AuthenticateUser=(req,res,next)=>{

const token=req.cookies.AccessToken
    console.log(token,"hello");

if(!token){
   return  res.status(401).json({msg:"Please Login or Signup"})
}



next()
}





import { Router } from "express";
import multer from "multer"
import generateAccessToken from "../Auth/auth.js";
import { UploadOnCloudinary } from "../utills/cloudinary.js";
import hashPassword from "../bcrypt/bcrypt.js";
import { db } from "../connnection/connection.js";


const storage=multer.diskStorage({
     destination:(req,file,cb)=>{
       return  cb(null,"./CarImg")
    },

    filename:(req,file,cb)=>{
        // console.log("file",file);
        
return cb(null,`${Date.now()}-${file.originalname}`)
    }
})



const uploads=multer({storage})




const UserRouter=Router();

UserRouter.post("/signup",uploads.single("img"),async(req,res)=>{
try {
        console.log("req,res");

// console.log(req.body,"ok",req.file);

const {fullName,email,password,phone}=req.body
const payload={fullName,email}

const img=await UploadOnCloudinary(req?.file?.path)
const pass=await hashPassword(password)

console.log("img",img,fullName,email,pass,phone);


const token=generateAccessToken(payload)
// console.log("token",token);


res.cookie("AccessToken",token)





const sql = `INSERT INTO signup (fullname, email, phone, password, img_url) 
                     VALUES (?, ?, ?, ?, ?)`;
        
        const values = [fullName, email, phone, pass, img];

        // 4. Execute
        const [result] = await db.execute(sql, values);
        
        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in signup",error);
        res.status(404).json({msg:"error in signup"})

}
    
})










UserRouter.post("/login",uploads.none(),async(req,res)=>{
try {
        console.log("req,res",req.body);

// console.log(req.body,"ok",req.file);

const {email,password}=req.body





const payload={email,password}



const sql = `select * from signup where email=?
                    `;
        
        const values = [email,password]
        // 4. Execute
        const [result] = await db.execute(sql, values);

        const token=generateAccessToken(payload)
// console.log("token",token);


res.cookie("AccessToken",token)
        
        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in login",error);
        res.status(404).json({msg:"error in signup"})

}
    
})

export default UserRouter
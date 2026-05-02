import { Router } from "express";
import multer from "multer"
import generateAccessToken, { generateRefreshToken } from "../Auth/auth.js";
import { UploadOnCloudinary } from "../utills/cloudinary.js";
import hashPassword from "../bcrypt/bcrypt.js";
import { AuthenticateUser } from "../middleware/middleware.js";
import  {db}  from "../db/db.js";


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
const refresh=generateRefreshToken(payload)
// console.log("token",token);


res.cookie("AccessToken",token,
    {
          httpOnly: true,
  secure: true,          // REQUIRED in production (HTTPS only)
  sameSite: "None",      // REQUIRED for cross-site (frontend ≠ backend)
  maxAge: 7 * 24 * 60 * 60 * 1000
    }
)

        res.cookie("RefreshToken",refresh,{
              httpOnly: true,
  secure: true,          // REQUIRED in production (HTTPS only)
  sameSite: "None",      // REQUIRED for cross-site (frontend ≠ backend)
  maxAge: 7 * 24 * 60 * 60 * 1000
        })



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
        const refresh=generateRefreshToken(payload)


res.cookie("AccessToken",token,
    {
          httpOnly: true,
  secure: true,          // REQUIRED in production (HTTPS only)
  sameSite: "None",      // REQUIRED for cross-site (frontend ≠ backend)
  maxAge: 7 * 24 * 60 * 60 * 1000
    }
)
        res.cookie("RefreshToken",refresh,
            {  httpOnly: true,
  secure: true,          // REQUIRED in production (HTTPS only)
  sameSite: "None",      // REQUIRED for cross-site (frontend ≠ backend)
  maxAge: 7 * 24 * 60 * 60 * 1000})

        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in login",error);
        res.status(404).json({msg:"error in signup"})

}
    
})











UserRouter.get("/detail/:id",async(req,res)=>{
try {
        console.log("req,res",req.params);

// console.log(req.body,"ok",req.file);

const id=req.params.id








const sql = `select * from car_listings where id=?
                    `;
        
        const values = [id]
        // 4. Execute
        const [result] = await db.execute(sql, values);

  
        
        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in login",error);
        res.status(404).json({msg:"error in signup"})

}
    
})
















UserRouter.get("/new-cars",async(req,res)=>{
try {
        console.log("req,res");

// console.log(req.body,"ok",req.file);







const sql = `
  SELECT * 
  FROM car_listings 
  WHERE condition_status = ? OR condition_status = ? 
`;

const values = ["Used – Good","Used – Like New"];
        // 4. Execute
        const [result] = await db.execute(sql, values);

  
        
        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in login",error);
        res.status(404).json({msg:"error in signup"})

}
    
})
















UserRouter.get("/old-cars",async(req,res)=>{
try {
        console.log("req,res");

// console.log(req.body,"ok",req.file);







const sql = `
  SELECT * 
  FROM car_listings 
  WHERE condition_status = ? 
`;

const values = ["Used – Fair"];
        // 4. Execute
        const [result] = await db.execute(sql, values);

  
        
        console.log('User registered with ID:', result.insertId);
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in login",error);
        res.status(404).json({msg:"error in signup"})

}
    
})













UserRouter.get("/check-auth",AuthenticateUser,async(req,res)=>{
try {
        console.log("req,res");










        
      


    res.status(200).send({msg:"ok"})
} catch (error) {
    console.log("err in auth",error);
        res.status(404).json({msg:"error in signup"})

}
    
})






UserRouter.get("/car_listings",async(req,res)=>{
try {
        console.log("req,res");




const sql = `
  SELECT * 
  FROM car_listings 
  
`;

        // 4. Execute
        const [result] = await db.execute(sql);

  
        
        console.log('User registered with ID:', result);
      





        
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in auth",error);
        res.status(404).json({msg:"error in signup"})

}
    
})








UserRouter.get("/registerUser",async(req,res)=>{
try {
        console.log("req,res");




const sql = `
  SELECT * 
  FROM signup
  
`;

        // 4. Execute
        const [result] = await db.execute(sql);

  
        
        console.log('User registered with ID:', result);
      





        
      


    res.status(200).send({msg:result})
} catch (error) {
    console.log("err in auth",error);
        res.status(404).json({msg:"error in signup"})

}
    
})




UserRouter.delete("/deleteUser/:id",async(req,res)=>{
try {
        console.log("req,response",req.params.id);


const id=req.params.id;


const sql = `
 Delete from car_listings where id=?
  
`;
const values=Number(id);
        // 4. Execute
        const [result] = await db.execute(sql,[values]);

  
        
      




        
      


    res.status(200).send({msg:"okay"})
} catch (error) {
    console.log("err in auth",error);
        res.status(404).json({msg:"error in signup"})

}
    
})









UserRouter.patch("/updateUser",async(req,res)=>{
try {
        console.log("req,res",req.body);


const {id,carTitle,brand,year,mileage,price,city}=req.body;

const sql = `
 Update  car_listings set carTitle=?,brand=?,year=?,mileage=?,price=?,city=? where id=?
  
`;
const values=[carTitle,brand,year,mileage,price,city,id]
      
        const [result] = await db.execute(sql,values);

  
        
        // console.log('User registered with ID:', "result");
      




        
      


    res.status(200).send({msg:"ok"})
} catch (error) {
    console.log("err in auth",error);
        res.status(404).json({msg:"error in signup"})

}
    
})

export default UserRouter
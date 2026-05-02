import express from "express";
import cors from "cors"
import multer from "multer"
import path from "path"
import  {UploadOnCloudinary} from "./utills/cloudinary.js"
import UserRouter from "./Routes/UserRoute.js";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer"
import { db } from "./db/db.js";




const app=express();


app.use(cookieParser())

app.use(express.json());




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



const allowedOrigins = [
  "http://localhost:5173",
  
  "https://autosouq-mern.onrender.com"
  
  // Vite
];

app.use(cors(
    {
         origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
        methods:["GET","POST","PATCH","DELETE"],
          credentials: true,    
    }
))


app.post("/sell-car",uploads.array("images",10),async(req,res)=>{
    console.log("body");

  try {

  


    const files = req.files; // array of uploaded files
    if (!files || files.length === 0) return res.status(400).json({ message: "No files uploaded" });
    console.log("before",req.body);
    
    // upload each image to Cloudinary
    const uploadedUrls = await Promise.all(
      files.map(file => UploadOnCloudinary(file.path))
    );
const values = [
    req.body.carTitle,
  
req.body.carBrand,
    req.body.carModel,
    parseInt(req.body.year) || null,
    parseInt(req.body.milage) || 0,        // Fixed spelling: milage
    req.body.fuelType || 'Unknown',        // ADDED THIS (Missing 6th column)
    req.body.transmission,
    req.body.bodyType,
    req.body.color,
    req.body.engineCapacity,
    parseFloat(req.body.price) || 0.00,
    req.body.negotiable,
    req.body.condition,
    req.body.accidentHistory,
    req.body.serviceHistory,
    req.body.country,
    req.body.city,
    req.body.address,
    req.body.description,
    JSON.stringify(req.body.features || []),
    JSON.stringify(uploadedUrls || []),
    req.body.sellerName,
    req.body.phone,
    req.body.email,
    req.body.contactMethod
];
    console.log("before ok",values);
//   console.log("bo",req.body,values);
    const [result]=await db.execute(`
INSERT INTO car_listings (
    carTitle, brand, model, year, mileage, fuelType, transmission, 
    bodyType, color, engineCapacity, price, negotiable, condition_status, 
    accidentHistory, serviceHistory, country, city, address, 
    description, features, images, sellerName, phone, email, contactMethod
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`,values)

// console.log("iam",uploadedUrls);


    res.status(200).json({msg:result})


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
    res.status(400).json({msg:"something in db going wrong"})
  }









    
})



app.use("/user",UserRouter)



const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});



app.get("/sendMail", async (req, res) => {

  const mailConfig = {
    from: "aad769650@gmail.com",
    to: "aad769650@gmail.com",
    subject: `Car buyer `,
    text:` i want to buy car can we please discuss further


    `,
  };

  try {
    await transport.sendMail(mailConfig);
    console.log("Email sent");
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err.code || err.message);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
});















app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
    
})
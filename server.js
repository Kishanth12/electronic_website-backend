import express from 'express' // This is the core library you're using to create the server and handle HTTP requests/responses.
import cors from 'cors'  //Middleware to allow cross-origin requests. Useful when your frontend and backend run on different ports or domains.
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//app config
const app = express();
const port = process.env.PORT || 8000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json()) //Parses the JSON body of incoming requests
app.use(cors())

//api endpoints and routes(get post update delete)
app.get('/',(req,res)=>{
     res.send("hi")
})


app.listen(port,()=>console.log('server started on PORT: '+ port))
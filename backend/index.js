import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './Routes/User.route.js';
import authRouters from './Routes/auth.route.js';

const port = 8000;
const app = express();
dotenv.config();


//  middleware

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

mongoose.connect(process.env.MONGODB_URL).then(
    ()=>{
        console.log(`MongoDb is connected`)
    })    
    .catch((err)=>{
        console.log(err)
    })

app.listen(8000, ()=>{
    console.log(`server is running on ${port}`)
});

app.use(express.json());

// routes
app.use('/api/user',userRoutes);
app.use('/api/auth',authRouters);

//
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    res.status(statusCode).json({ 
        success:false,
        statusCode,
        message,
    });
});
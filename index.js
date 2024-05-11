

import dotenv from 'dotenv';
import express from 'express';
import connectMongoose from './config/mongoose.js';
import questionRouter from './src/features/questions/routes/questionroutes.js';
import optionRouter from './src/features/options/routes/optionroutes.js';
import ApplicationError from './src/Middleware/ApplicationError.js';
import mongoose from 'mongoose';
dotenv.config();

// Initiating server
const app = express();

// Parsing data middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Default route
app.get('/', (req,res,next)=>{
    res.send("Polling System API project home page");
});

// Routes
app.use('/api/questions', questionRouter);
app.use('/api/options', optionRouter);

// Wrong routes
app.use((req,res,next)=>{
    res.status(404).send("No route found. Enter correct route.");
});

// Error handler
app.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.status(400).json({
            success: "false",
            error: err.message
        });
    }
    if(err instanceof ApplicationError)
    {
        return res.status(err.statusCode || 500).json({
            success: "false",
            error: err.message
        });
    }
    res.status(500).json({
        success: "false",
        error: "Something went wrong."
    });
});

// Server
app.listen(3200, ()=>{
    console.log('Server is listening on 3200');
    connectMongoose();
})
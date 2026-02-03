import express from "express";
import env from "./lib/env.js";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/inngest", serve({ 
  client: inngest, 
  functions: functions 
}));

const connectDB = async () => 
{
    const url = env.MONGO_URL;
    if(!url)
    {
        console.log("Mongo_URL not found")
    }
    try{
        await mongoose.connect(url);
        console.log("Connected to DB Successfully");
    }
    catch{
        console.log("Error in connecting to DB");
    }
}


const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(env.PORT);
        console.log(`Server is running and up on port ${env.PORT}`);
    }
    catch(error){
        console.log(error.message);
    }
};

startServer();
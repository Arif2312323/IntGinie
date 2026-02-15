import express from "express";
import env from "./lib/env.js";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import {clerkMiddleware} from "@clerk/express"
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoute from "./routes/chatRoute.js"
import sessionRoute from "./routes/sessionRoute.js"

const app = express();


app.use(express.json());
app.use(cors({
  origin: true,        // allow all origins
  credentials: true    // allow cookies/auth headers (needed for Clerk)
}));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ 
  client: inngest, 
  functions: functions 
}));

app.use("/api/chat",chatRoute);
app.use("/api/sessions",sessionRoute);

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
    catch(err){
        console.error("DB connection error:", err instanceof Error ? err.message : String(err));
    }
}
const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(env.PORT);
        console.log(`Server is running and up on port ${env.PORT}`);
    }
    catch(err){
        console.error("Server startup error:", err instanceof Error ? err.message : String(err));
    }
};

startServer();
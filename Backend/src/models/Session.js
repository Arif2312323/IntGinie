import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    problem : {
        type : String,
        required : true
    },
    difficulty : {
        type : String,
        enum : ["easy","medium","hard"],
        required : true
    },
    host : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    participant : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        default : null
    },
    status : {
        type : String,   // ✅ FIXED
        enum : ["active", "completed"],
        default : "active",
        required : true
    },
    callId : {
        type : String,
        default : ""
    }
},{
    timestamps : true   
});

const Session = mongoose.model("Session",SessionSchema);

export default Session;

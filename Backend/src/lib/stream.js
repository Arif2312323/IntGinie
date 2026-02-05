import {StreamChat} from "stream-chat"
import env from "./env.js"

const apiKey = env.STREAM_API_KEY;
const secretKey = env.STREAM_API_SECRET;

if(!apiKey || !secretKey)
{
    console.log("STREAM API KEY OR SECRET NOT FOUND");
}

export const chatClient = StreamChat.getInstance(apiKey,secretKey);

export const upsertStreamUser = async (userData) => {
    try
    {
        await chatClient.upsertUser(userData);
        console.log("User added successfully");
    }
    catch(error)
    {
        console.log("Error upserting stream user:", error);
    }
};

export const deleteStreamUser = async (userId) => {
    try{
        await chatClient.deleteUser(userId);
        console.log("User deleted successfully");
    }
    catch(error){
        console.log("Error deleting stream user:", error)
    }
};



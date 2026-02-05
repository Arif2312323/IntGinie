import {StreamChat} from "stream-chat"
import env from "./env.js"

const apiKey = env.STREAM_API_KEY;
const secretKey = env.STREAM_API_SECRET;

if(!apiKey || !secretKey)
{
    console.error("STREAM API KEY OR SECRET NOT FOUND - Check your .env file");
    process.exit(1);
}

export const chatClient = StreamChat.getInstance(apiKey,secretKey);

export const upsertStreamUser = async (userData) => {
    try
    {
        console.log("Attempting to add user to Stream:", userData);
        await chatClient.upsertUser(userData);
        console.log("User added successfully to Stream");
    }
    catch(error)
    {
        console.error("Error upserting stream user:", error.message || error);
    }
};

export const deleteStreamUser = async (userId) => {
    try{
        console.log("Attempting to delete user from Stream:", userId);
        await chatClient.deleteUser(userId);
        console.log("User deleted successfully from Stream");
    }
    catch(error){
        console.error("Error deleting stream user:", error.message || error)
    }
};



import { Inngest } from "inngest";
import User from "../models/User.js";
import mongoose from "mongoose";
import env from "./env.js";


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

export const inngest = new Inngest({ id: "ginview" });
export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    // await upsertStreamUser({
    //   id: newUser.clerkId.toString(),
    //   name: newUser.name,
    //   image: newUser.profileImage,
    // });
  }
);

export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    // await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
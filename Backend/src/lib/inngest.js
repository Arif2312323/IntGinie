
import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "ginview" });

export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email, firstName, lastName, imageUrl } = event.data;
    
    try {
      await User.findByIdAndUpdate(
        id,
        {
          _id: id,
          email,
          firstName,
          lastName,
          imageUrl,
        },
        { upsert: true, new: true }
      );
      return { success: true, message: "User synced to database" };
    } catch (error) {
      throw new Error(`Failed to sync user: ${error.message}`);
    }
  }
);

export const deleteFromDB = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    
    try {
      await User.findByIdAndDelete(id);
      return { success: true, message: "User deleted from database" };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
);
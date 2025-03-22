"use server";

import User from "@/lib/modals/user.modal";
import { connect } from "@/lib/db/db";

export async function createUser(user: any) {
  try {
    await connect();
    console.log("Connected to MongoDB"); // Debugging log

    const newUser = await User.create(user);
    console.log("User created in MongoDB:", newUser); // Debugging log

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user in MongoDB:", error); // Debugging log
    throw new Error("Failed to create user in MongoDB");
  }
}

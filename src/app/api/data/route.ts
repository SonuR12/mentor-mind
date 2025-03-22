import { connect } from "@/lib/db/db";
import User from "@/lib/modals/user.modal";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  await connect(); // Connect to MongoDB

  const { userId } : any = auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const userData = {
    clerkId: userId,
    username: user?.username || `${user?.firstName} ${user?.lastName}` || "Guest",
    email: user?.emailAddresses[0]?.emailAddress || "N/A",
    photo: user?.imageUrl || "N/A",
  };

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      // Save new user
      await User.create(userData);
      console.log("New user saved:", userData);
    } else {
      console.log("User already exists:", existingUser);
    }

    return NextResponse.json({ message: "Authenticated", data: userData }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}

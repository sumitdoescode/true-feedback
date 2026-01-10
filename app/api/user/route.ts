import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";

// PATCH => /api/user
// this route is used to change isAcceptignMessage value
export async function PATCH(request: NextRequest) {
   try {
      await connectDB();
      const authUser = await getAuthUser();
      if (!authUser) {
         return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }

      const user = await User.findOne({ email: authUser?.email });
      if (!user) {
         return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
      user.isAcceptingMessages = !user.isAcceptingMessages;
      await user.save();

      return NextResponse.json({ success: true, data: { isAcceptingMessages: user.isAcceptingMessages } }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
   }
}

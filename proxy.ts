import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === "/login";
    const isCompleteProfilePage = request.nextUrl.pathname === "/complete-profile";
    const isUpdateProfilePage = request.nextUrl.pathname === "/update-profile";

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // if user is on login page
    if (isLoginPage) {
        if (session?.user) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    // if user trying to get to complete-profile page
    if (isCompleteProfilePage) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // if user is already completed profile, redirect to dashboard
        if (session?.user?.isCompletedProfile) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    // if user is trying to get to update-profile page
    if (isUpdateProfilePage) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (!session?.user?.isCompletedProfile) {
            return NextResponse.redirect(new URL("/complete-profile", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/complete-profile", "/update-profile"],
};

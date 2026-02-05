import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === "/login";

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // if user is on login page
    if (isLoginPage) {
        if (session?.user) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // that means user is on trying to get on other pages
    if (!session?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/update-profile", "/dashboard"],
};

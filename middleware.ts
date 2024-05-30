import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
    const cookie = cookies().get('Authorization');
    if (!cookie) {
        return NextResponse.redirect(new URL("/auth/SignIn", request.url));
    }
    
}
export const config = {
    matcher: [
        '/((?!auth/signIn).*)',
        '/((?!_next/static|_next/image|.swa/health|favicon.ico).*)',
      ]
}
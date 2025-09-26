// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth";

import {
DEFAULT_LOGIN_REDIRECT,
apiAuthPrefix,
authRoutes,
protectedRoutes,
publicRoutes,
} from '@/routes'
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);


export default auth((req) => {
const {nextUrl} = req;
const isLoggedIn = !!req.auth;
const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix) 
const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
const isAuthRoute = authRoutes.includes(nextUrl.pathname);

if(isApiAuthRoute){
    return null;
}


if(isAuthRoute){
    if(isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

 

    return null;
}

   if(!isLoggedIn && !isPublicRoute){
        return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
    
    
    }
return null;
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    
  ],
}


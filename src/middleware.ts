import { getAuthData } from "./actions/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authData = await getAuthData();
  if(!authData) return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
    '/protected/:path*',
  ]
}
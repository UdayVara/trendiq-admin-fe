import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/signin") {
    const user = await auth();

    if (!user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

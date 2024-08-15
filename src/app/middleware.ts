import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/' || pathname.startsWith('/task')) {
    return NextResponse.next();
  }

  const notFoundUrl = new URL('/not-found', request.url);
  return NextResponse.redirect(notFoundUrl);
}

export const config = {
  matcher: ['/', '/task/:path*'], 
};

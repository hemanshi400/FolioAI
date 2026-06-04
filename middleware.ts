import { NextResponse, type NextRequest } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

const publicRoutePatterns: RegExp[] = [
  /^\/$/, // root
  /^\/sign-in/,
  /^\/sign-up/,
  /^\/api\/portfolio/,
  /^\/[^/]+$/,
];

function isPublicPath(pathname: string) {
  return publicRoutePatterns.some((re) => re.test(pathname));
}

const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY,
);

const middlewareFunction = clerkConfigured
  ? clerkMiddleware((auth, request) => {
      const pathname = request.nextUrl?.pathname || new URL(request.url).pathname || '/';
      if (!isPublicPath(pathname)) {
        auth().protect();
      }
    })
  : (_request: NextRequest) => NextResponse.next();

export default middlewareFunction;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

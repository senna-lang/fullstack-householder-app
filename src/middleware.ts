import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const url = new URL(req.nextUrl.origin);

    auth().protect({
      unauthenticatedUrl: `${url.origin}/sign-in`,
      unauthorizedUrl: `${url.origin}/`,
    });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/dashboard", "/"])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const url = new URL(req.nextUrl.origin)
    const path = req.nextUrl.pathname

    if (path === "/dashboard") {
      auth().protect({
        unauthenticatedUrl: `${url.origin}/sign-in`,
        unauthorizedUrl: `${url.origin}/dashboard`,
      })
    } else if (path === "/") {
      auth().protect({
        unauthenticatedUrl: `${url.origin}/sign-in`,
        unauthorizedUrl: `${url.origin}/`,
      })
    }
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

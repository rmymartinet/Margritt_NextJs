import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/home",
  "/api(.*)",
]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Ignore les fichiers internes de Next.js et tous les fichiers statiques
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Toujours exécuter pour les routes API
    "/(api|trpc)(.*)",
  ],
};

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import ThreadPage from "@/pages/ValidateThread/Thread";
import NotFound from "@/pages/NotFound/NotFound";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: NotFound,
});

export const threadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$cskey/$cfstoken",
  component: ThreadPage,
});

const routeTree = rootRoute.addChildren([indexRoute, threadRoute]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import App from "./App";
import NotFound from "./components/NotFound/NotFound";

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
  component: App,
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

export interface IRoute {
  key: string;
  path: string;
  component: React.ComponentType;
  routeType: RouteType;
  exact: boolean;
}

export enum RouteType {
  PUBLIC_ROUTE,
  PRIVATE_ROUTE,
  AUTH_ROUTE
}

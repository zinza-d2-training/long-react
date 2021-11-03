import { IRoute, RouteType } from 'models';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';

export const RoutePaths = {
  login: '/login',
  forgotPassword: '/forgot-password',
  register: '/register',
  home: '/'
};

const routes: IRoute[] = [
  {
    key: 'route_login',
    path: RoutePaths.login,
    component: Login,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_forgot_password',
    path: RoutePaths.forgotPassword,
    component: ForgotPassword,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_register',
    path: RoutePaths.register,
    component: Register,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_home',
    path: RoutePaths.home,
    component: Home,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
  }
];

export default routes;

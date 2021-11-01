import { IRoute, RouteType } from 'models';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';

export const PATH_LOGIN = '/login';
export const PATH_FORGOT_PASSWORD = '/forgot-password';
export const PATH_REGISTER = '/register';
export const PATH_HOME = '/';

const routes: IRoute[] = [
  {
    key: 'route_login',
    path: PATH_LOGIN,
    component: Login,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_forgot_password',
    path: PATH_FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_register',
    path: PATH_REGISTER,
    component: Register,
    exact: true,
    routeType: RouteType.AUTH_ROUTE
  },
  {
    key: 'route_home',
    path: PATH_HOME,
    component: Home,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
  }
];

export default routes;

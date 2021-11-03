import { IRoute, RouteType } from 'models';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import InjectionRegistration from 'pages/InjectionRegistration';
import Login from 'pages/Login';
import Register from 'pages/Register';
import VaccineCertificate from 'pages/VaccineCertificate';
import VaccineRegistration from 'pages/VaccineRegistration';

export const RoutePaths = {
  login: '/login',
  forgotPassword: '/forgot-password',
  register: '/register',
  vaccineCertificate: '/vaccine-certificate',
  injectionRegistration: '/injection-registration',
  vaccineRegistration: '/vaccine-registration',
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
    key: 'route_vaccine_certificate',
    path: RoutePaths.vaccineCertificate,
    component: VaccineCertificate,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
  },
  {
    key: 'route_injection_registration',
    path: RoutePaths.injectionRegistration,
    component: InjectionRegistration,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
  },
  {
    key: 'route_vaccine_registration',
    path: RoutePaths.vaccineRegistration,
    component: VaccineRegistration,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
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

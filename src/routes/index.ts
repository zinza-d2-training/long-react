import { IRoute, RouteType } from 'models';
import {
  Document,
  ForgotPassword,
  Home,
  InjectionRegistration,
  Login,
  Register,
  User,
  VaccineCertificate,
  VaccineRegistration
} from 'pages';

export const RoutePaths = {
  login: '/login',
  forgotPassword: '/forgot-password',
  register: '/register',
  vaccineCertificate: '/vaccine-certificate',
  injectionRegistration: '/injection-registration',
  vaccineRegistration: '/vaccine-registration',
  document: '/document',
  user: '/user',
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
    key: 'route_document',
    path: RoutePaths.document,
    component: Document,
    exact: true,
    routeType: RouteType.PUBLIC_ROUTE
  },
  {
    key: 'route_user',
    path: RoutePaths.user,
    component: User,
    exact: true,
    routeType: RouteType.PRIVATE_ROUTE
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

import Home from 'pages/Home';
import Login from 'pages/Login';

interface IRoute {
  id: string;
  path: string;
  component: React.ComponentType;
  exact: boolean;
}

export const PATH_LOGIN = '/login';
export const PATH_HOME = '/';

const routes: IRoute[] = [
  { id: 'route0', path: PATH_LOGIN, component: Login, exact: true },
  { id: 'route1', path: PATH_HOME, component: Home, exact: true }
];

export default routes;

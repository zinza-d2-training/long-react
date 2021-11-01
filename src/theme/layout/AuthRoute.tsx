import { Redirect, Route, RouteProps } from 'react-router';
import { RoutePaths } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

const AuthRoute = (props: RouteProps) => {
  const token = useAppSelector(authSelector).token;

  if (token) {
    return <Redirect to={RoutePaths.home} />;
  } else {
    return <Route {...props} />;
  }
};

export default AuthRoute;

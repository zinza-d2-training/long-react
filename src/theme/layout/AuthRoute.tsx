import { Redirect, Route, RouteProps } from 'react-router';
import { PATH_HOME } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

const AuthRoute = (props: RouteProps) => {
  const token = useAppSelector(authSelector).token;

  if (token) {
    return <Redirect to={PATH_HOME} />;
  } else {
    return <Route {...props} />;
  }
};

export default AuthRoute;

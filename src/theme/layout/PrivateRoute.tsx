import { Redirect, Route, RouteProps } from 'react-router';
import { RoutePaths } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

const PrivateRoute = (props: RouteProps) => {
  const token = useAppSelector(authSelector).token;
  if (token) {
    return (
      <Route
        path={props.path}
        component={props.component}
        exact={props.exact}
      />
    );
  } else {
    return <Redirect to={RoutePaths.login} />;
  }
};

export default PrivateRoute;

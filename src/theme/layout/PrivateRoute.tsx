import { Redirect, Route, RouteProps } from 'react-router';
import { PATH_LOGIN } from 'routes';
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
    return <Redirect to={PATH_LOGIN} />;
  }
};

export default PrivateRoute;

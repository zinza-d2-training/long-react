import { Redirect, Route, RouteProps } from 'react-router';
import { RoutePaths } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

const PrivateRoute = (props: RouteProps) => {
  const auth = useAppSelector(authSelector);
  const token = auth.token;
  const useInfo = auth.userInfo;
  if (token && useInfo) {
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

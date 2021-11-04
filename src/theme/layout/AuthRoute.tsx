import { Redirect, Route, RouteProps } from 'react-router';
import { RoutePaths } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

export const AuthRoute = (props: RouteProps) => {
  const auth = useAppSelector(authSelector);
  const token = auth.token;
  const useInfo = auth.userInfo;

  if (token && useInfo) {
    return <Redirect to={RoutePaths.home} />;
  } else {
    return <Route {...props} />;
  }
};

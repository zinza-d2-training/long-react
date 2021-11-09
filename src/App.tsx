import { CssBaseline } from '@mui/material';
import { RouteType } from 'models';
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import { useAppSelector } from 'store';
import { i18nSelector } from 'store/slices/i18nSlice';
import { AuthRoute, Layout, PrivateRoute } from 'theme/layout';
import { i18n } from 'utils';

function App() {
  const languageMode = useAppSelector(i18nSelector).languageMode;

  useEffect(() => {
    i18n.changeLanguage(languageMode);
  }, [languageMode]);
  return (
    <Suspense fallback="Loading...">
      <CssBaseline />
      <Layout>
        <Router>
          <Switch>
            {routes.map(({ routeType, ...routeProps }) => {
              if (routeType === RouteType.PRIVATE_ROUTE) {
                return <PrivateRoute {...routeProps} />;
              } else if (routeType === RouteType.AUTH_ROUTE) {
                return <AuthRoute {...routeProps} />;
              } else {
                return <Route {...routeProps} />;
              }
            })}
          </Switch>
        </Router>
      </Layout>
    </Suspense>
  );
}

export default App;

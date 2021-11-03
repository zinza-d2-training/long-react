import { CssBaseline } from '@mui/material';
import { RouteType } from 'models';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from 'routes';
import Layout, { PrivateRoute, AuthRoute } from 'theme/layout';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

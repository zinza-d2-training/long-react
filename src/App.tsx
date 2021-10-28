import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from 'routes';
import Layout, { PrivateRoute } from 'theme/layout';
import AuthRoute from 'theme/layout/AuthRoute';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Router>
          <Switch>
            {routes.map(({ id, path, component, exact, privateRoute }) => {
              if (privateRoute) {
                return (
                  <PrivateRoute
                    key={id}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                );
              } else {
                return (
                  <AuthRoute
                    key={id}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                );
              }
            })}
          </Switch>
        </Router>
      </Layout>
    </>
  );
}

export default App;

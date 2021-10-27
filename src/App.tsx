import { CssBaseline } from '@mui/material';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import routes from 'routes';
import Layout, { PrivateRoute } from 'theme/layout';

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
                  <Route
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

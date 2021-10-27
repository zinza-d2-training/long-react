import { CssBaseline } from '@mui/material';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import routes from 'routes';
import Layout from 'theme/layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Router>
          <Switch>
            {routes.map(({ id, path, component, exact }) => (
              <Route key={id} path={path} exact={exact} component={component} />
            ))}
          </Switch>
        </Router>
      </Layout>
    </>
  );
}

export default App;

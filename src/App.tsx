import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import routes from 'routes';
import Layout from 'theme/layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Switch>
          {routes.map(({ id, path, component, exact }) => (
            <Route key={id} path={path} exact={exact} component={component} />
          ))}
        </Switch>
      </Layout>
    </>
  );
}

export default App;

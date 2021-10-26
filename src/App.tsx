import { CssBaseline, Typography } from '@mui/material';
import Layout from 'theme/layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Typography variant="h1">h1</Typography>
        <Typography variant="h2">h2</Typography>
        <Typography variant="h3">h3</Typography>
        <Typography variant="subtitle1">subtitle1</Typography>
        <Typography variant="subtitle2">subtitle2</Typography>
        <Typography variant="bodySmall">bodySmall</Typography>
      </Layout>
    </>
  );
}

export default App;

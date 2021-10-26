import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import InputField from 'components/InputField';

const Login = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Box
            sx={{
              background: 'url("images/login_background.png") no-repeat',
              backgroundSize: 'cover',
              minHeight: '100vh'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <InputField
              placeholder="admin@gmail.com"
              label="Email"
              error="error"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

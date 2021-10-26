import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputField from 'components/InputField';
import PrimaryButton from 'components/PrimaryButton';

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
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Box
              component="form"
              sx={{
                width: '376px'
              }}>
              <Typography variant="body1">Chào mừng trở lại</Typography>
              <Typography variant="h4" mb={3}>
                Đăng nhập vào tài khoản
              </Typography>
              <Box mb={2}>
                <InputField placeholder="admin@gmail.com" label="Email" />
              </Box>
              <Box mb={2}>
                <InputField
                  placeholder="password"
                  label="Mật khẩu"
                  type="password"
                />
              </Box>
              <Typography
                variant="body2"
                mb={3}
                align="right"
                sx={{ cursor: 'pointer' }}>
                Quên mật khẩu?
              </Typography>
              <PrimaryButton fullWidth>Login now</PrimaryButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

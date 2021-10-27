import {
  Button,
  colors,
  Grid,
  TextField,
  Theme,
  Typography
} from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ILogin } from 'models';
import { loginSchema } from 'validations';
import { useAppDispatch, useAppSelector } from 'store';
import { authSelector, login } from 'store/slices/authSlice';

const errorStyle: SxProps<Theme> = {
  color: colors.red['700']
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });
  const dispatch = useAppDispatch();
  const loginLoading = useAppSelector(authSelector).loading;

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(login(data));
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Box
            sx={{
              background: 'url("images/login_background.png") no-repeat',
              backgroundSize: 'cover',
              height: '100%'
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
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              sx={{
                width: '376px'
              }}>
              <Typography variant="body1">Chào mừng trở lại</Typography>
              <Typography variant="h4" mb={3}>
                Đăng nhập vào tài khoản
              </Typography>
              <Box mb={2}>
                <Typography component="label" variant="label">
                  Chứng minh nhân dân/Căn cước công dân
                </Typography>
                <Controller
                  name="citizenId"
                  control={control}
                  defaultValue="012345678"
                  render={({ field }) => (
                    <TextField
                      sx={{ root: { height: '50px' } }}
                      fullWidth
                      placeholder="123456789"
                      {...field}
                    />
                  )}
                />
                {errors.citizenId?.message && (
                  <Typography variant="bodySmall" sx={errorStyle}>
                    {errors.citizenId?.message}
                  </Typography>
                )}
              </Box>
              <Box mb={2}>
                <Typography component="label" variant="label">
                  Password
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  defaultValue="long@zinza123"
                  render={({ field }) => (
                    <TextField
                      sx={{ root: { height: '50px' } }}
                      fullWidth
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  )}
                />
                {errors.password?.message && (
                  <Typography variant="bodySmall" sx={errorStyle}>
                    {errors.password?.message}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                mb={3}
                align="right"
                sx={{ cursor: 'pointer' }}>
                Quên mật khẩu?
              </Typography>
              <Button
                disabled={Boolean(
                  !!errors.citizenId?.message ||
                    !!errors.password?.message ||
                    loginLoading
                )}
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: colors.green['400'],
                  color: '#fff',
                  height: '50px',
                  '&:hover': {
                    backgroundColor: colors.green['400']
                  }
                }}>
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

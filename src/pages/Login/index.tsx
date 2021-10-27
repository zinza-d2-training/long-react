import {
  Button,
  CircularProgress,
  colors,
  TextField,
  Theme,
  Typography
} from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { ILogin } from 'models';
import { loginSchema } from 'validations';
import { useAppDispatch, useAppSelector } from 'store';
import { authSelector, login } from 'store/slices/authSlice';
import { PATH_FORGOT_PASSWORD, PATH_HOME } from 'routes';

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
  const auth = useAppSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) {
      history.push(PATH_HOME);
    }
  }, [history, auth]);

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(login(data));
  };

  const pushToForgotPassPage = () => {
    history.push(PATH_FORGOT_PASSWORD);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
      <Box
        sx={{
          background: 'url("images/login_background.png") no-repeat',
          backgroundSize: 'cover',
          flex: 1
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
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
                  sx={{
                    height: '50px',
                    mt: (theme) => theme.spacing(1),
                    '& > div': {
                      height: '100%'
                    }
                  }}
                  fullWidth
                  placeholder="123456789"
                  {...field}
                  disabled={auth.loading}
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
            <Typography component="label" variant="label" mb={1}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue="long@zinza123"
              render={({ field }) => (
                <TextField
                  sx={{
                    height: '50px',
                    mt: (theme) => theme.spacing(1),
                    '& > div': {
                      height: '100%'
                    }
                  }}
                  fullWidth
                  placeholder="password"
                  type="password"
                  {...field}
                  disabled={auth.loading}
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
            sx={{ cursor: 'pointer' }}
            onClick={pushToForgotPassPage}>
            Quên mật khẩu?
          </Typography>
          <Button
            disabled={Boolean(
              !!errors.citizenId?.message ||
                !!errors.password?.message ||
                auth.loading
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
            {auth.loading && (
              <CircularProgress
                size={20}
                color="info"
                sx={{ mr: (theme) => theme.spacing(1) }}
              />
            )}
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

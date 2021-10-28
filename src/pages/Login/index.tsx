import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  colors,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import ErrorMessage from 'components/ErrorMessage';
import { ILogin } from 'models';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { PATH_FORGOT_PASSWORD, PATH_REGISTER } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { authSelector, login } from 'store/slices/authSlice';
import { loginSchema } from 'validations';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched'
  });
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);
  const history = useHistory();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(login(data));
  };

  const handlePushToRegister = () => {
    history.push(PATH_REGISTER);
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
          <Typography variant="h4" mb={3} fontWeight="bold">
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
                    mt: 1,
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
              <ErrorMessage>{errors.citizenId?.message}</ErrorMessage>
            )}
          </Box>
          <Box mb={2}>
            <Typography component="label" variant="label" mb={1}>
              Mật khẩu
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue="long@zinza123"
              render={({ field }) => (
                <TextField
                  sx={{
                    height: '50px',
                    mt: 1,
                    '& > div': {
                      height: '100%'
                    }
                  }}
                  fullWidth
                  placeholder="**************"
                  type="password"
                  {...field}
                  disabled={auth.loading}
                />
              )}
            />
            {errors.password?.message && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <Typography
              component={Link}
              to={PATH_FORGOT_PASSWORD}
              variant="body2"
              mb={3}
              align="right"
              sx={{ color: colors.indigo[600] }}>
              Quên mật khẩu?
            </Typography>
          </Box>
          <Button
            disabled={Boolean(
              !!errors.citizenId?.message ||
                !!errors.password?.message ||
                auth.loading
            )}
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: colors.green[400],
              color: '#fff',
              height: '50px',
              '&:hover': {
                backgroundColor: colors.green[400]
              }
            }}>
            {auth.loading && (
              <CircularProgress size={20} color="info" sx={{ mr: 1 }} />
            )}
            Đăng nhập
          </Button>
          <Typography variant="body1" my={2} align="center">
            Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={handlePushToRegister}
            sx={{
              height: '50px',
              borderColor: colors.green[400],
              color: colors.green[400],
              '&:hover': {
                borderColor: colors.green[400],
                color: colors.green[400]
              }
            }}>
            Đăng ký
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

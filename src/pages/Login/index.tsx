import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  colors,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Label } from 'components';
import { ILogin } from 'models';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, Link as RouterLink, useHistory } from 'react-router-dom';
import { RoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { authSelector, getUserInfo, login } from 'store/slices/authSlice';
import { styleInputLarge } from 'theme';
import { loginSchema } from 'validations';

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched'
  });
  const history = useHistory();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);

  const onSubmit: SubmitHandler<ILogin> = useCallback(
    async (data) => {
      try {
        await dispatch(login(data));
        await dispatch(getUserInfo());
        history.push(RoutePaths.user);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, history]
  );

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
          flex: 1
        }}>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            width: 380,
            mt: '100px',
            '@media(min-height: 768px)': {
              mt: '150px'
            },
            '@media(min-height: 920px)': {
              mt: '25vh'
            }
          }}>
          <Typography variant="h4" fontWeight="bold" mb={3} align="center">
            Đăng nhập vào tài khoản
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Box>
                <Label component="label" variant="label">
                  Chứng minh nhân dân/Căn cước công dân
                </Label>
                <Controller
                  name="citizenId"
                  control={control}
                  defaultValue="012345678"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={styleInputLarge}
                      fullWidth
                      placeholder="123456789"
                      {...field}
                      disabled={auth.loading}
                      error={invalid}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Label mb={1}>Mật khẩu</Label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue="long@zinza123"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={styleInputLarge}
                      fullWidth
                      placeholder="**************"
                      type="password"
                      {...field}
                      disabled={auth.loading}
                      error={invalid}
                      helperText={error?.message}
                    />
                  )}
                />
              </Box>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              <Typography
                component={Link}
                to={RoutePaths.forgotPassword}
                variant="body2"
                align="right"
                sx={{ color: colors.indigo[600], textDecoration: 'none' }}>
                Quên mật khẩu?
              </Typography>
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                height: '50px',
                backgroundColor: colors.green[400],
                '&:hover': {
                  backgroundColor: colors.green[400]
                }
              }}
              disabled={Boolean(
                !!errors.citizenId?.message ||
                  !!errors.password?.message ||
                  auth.loading
              )}
              startIcon={auth.loading && <CircularProgress size={20} />}>
              Đăng nhập
            </Button>
          </Stack>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <Typography variant="body1" align="center" my={3}>
              Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !
            </Typography>
            <Button
              component={RouterLink}
              to={RoutePaths.register}
              variant="outlined"
              fullWidth
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
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

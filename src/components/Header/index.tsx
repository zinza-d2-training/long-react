import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  colors,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Typography
} from '@mui/material';
import { SxProps } from '@mui/system';
import StyledButton from 'components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { authSelector, logout } from 'store/slices/authSlice';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useHistory } from 'react-router-dom';

const menuItemStyle: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: '#281BA4'
  }
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const useInfo = useAppSelector(authSelector).userInfo;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(RoutePaths.login);
  };

  return (
    <Box
      sx={{
        background:
          'linear-gradient(90deg, #ED1B23 0%, #2E3091 52.08%, #253494 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw'
      }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px'
          }}>
          <Stack direction="row" alignItems="center">
            <img src="images/logo_white.png" alt="" />
            <Typography ml={2} color="#fff">
              CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="30px">
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="h6"
              to={RoutePaths.home}>
              Trang chủ
            </Typography>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="h6"
              to={RoutePaths.home}>
              Đăng ký tiêm
            </Typography>
            <Typography
              color="#fff"
              sx={{ textTransform: 'unset' }}
              component={Button}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              variant="h6">
              Tra cứu
            </Typography>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="h6"
              to={RoutePaths.home}>
              Tài liệu
            </Typography>

            {useInfo ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1" sx={{ color: '#fff' }}>
                  Hi {useInfo.username}
                </Typography>
                <IconButton onClick={handleLogout} sx={{ color: '#f00' }}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Stack>
            ) : (
              <StyledButton
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#fff' }
                }}>
                <Typography
                  sx={{ textDecoration: 'none', color: colors.indigo[700] }}
                  variant="button"
                  component={Link}
                  to={RoutePaths.login}>
                  Đăng nhập
                </Typography>
              </StyledButton>
            )}
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem>
                <Typography
                  component={Link}
                  onClick={handleClose}
                  variant="body1"
                  sx={menuItemStyle}
                  to={RoutePaths.home}>
                  Tra cứu chứng nhận tiêm
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  component={Link}
                  onClick={handleClose}
                  variant="body1"
                  sx={menuItemStyle}
                  to={RoutePaths.home}>
                  Tra cứu kết quả đăng ký
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;

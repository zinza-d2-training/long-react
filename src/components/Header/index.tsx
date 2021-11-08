import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  colors,
  Container,
  Popper,
  MenuItem,
  Stack,
  Theme,
  Typography,
  Paper,
  Grow,
  MenuList
} from '@mui/material';
import { SxProps } from '@mui/system';
import { StyledButton } from 'components';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'routes';
import { useAppSelector } from 'store';
import { authSelector } from 'store/slices/authSlice';

const menuItemStyle: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  height: '100%',
  display: 'inline-block',
  py: 1,
  textDecoration: 'none',
  '&:hover': {
    color: '#281BA4'
  }
};

export const Header = () => {
  const useInfo = useAppSelector(authSelector).userInfo;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        background:
          'linear-gradient(90deg, #ED1B23 0%, #2E3091 52.08%, #253494 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: (theme) => theme.zIndex.appBar
      }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px'
          }}>
          <Stack direction="row" alignItems="center">
            <img src="images/logo_white.png" alt="" />
            <Typography variant="h6" ml={2} color="#fff">
              CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="body1"
              to={RoutePaths.home}>
              Trang chủ
            </Typography>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="body1"
              to={RoutePaths.vaccineRegistration}>
              Đăng ký tiêm
            </Typography>
            <Box component="div" onMouseLeave={handleCloseMenu}>
              <Typography
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleOpenMenu}
                color="#fff"
                sx={{ textTransform: 'unset' }}
                component={Button}
                endIcon={<KeyboardArrowDownIcon />}
                variant="body1">
                Tra cứu
              </Typography>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start'
                          ? 'left top'
                          : 'left bottom'
                    }}>
                    <Paper
                      sx={{
                        boxShadow: '0px 0px 30px rgba(127, 137, 161, 0.4)'
                      }}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        sx={{ p: 0 }}>
                        <MenuItem sx={{ py: 0 }}>
                          <Typography
                            component={Link}
                            onClick={handleCloseMenu}
                            variant="body2"
                            sx={menuItemStyle}
                            to={RoutePaths.vaccineCertificate}>
                            Tra cứu chứng nhận tiêm
                          </Typography>
                        </MenuItem>
                        <MenuItem sx={{ py: 0 }}>
                          <Typography
                            component={Link}
                            onClick={handleCloseMenu}
                            variant="body2"
                            sx={menuItemStyle}
                            to={RoutePaths.injectionRegistration}>
                            Tra cứu kết quả đăng ký
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={Link}
              variant="body1"
              to={RoutePaths.home}>
              Tài liệu
            </Typography>

            {useInfo ? (
              <Typography variant="body1" sx={{ color: '#fff' }}>
                Hi {useInfo.username}
              </Typography>
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
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

import { Box, Button, colors, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppSubMenu, AppSubMenuItem } from '../ui';
import { StyledButton } from '../Button';
import { Link as RouterLink } from 'react-router-dom';
import { RoutePaths } from '../../routes';
import { useAppSelector } from '../../store';
import { authSelector } from '../../store/slices/authSlice';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserMenuItem = () => {
  const { t } = useTranslation();
  const useInfo = useAppSelector(authSelector).userInfo;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const userSubMenu = useMemo<AppSubMenuItem[]>(() => {
    return [
      {
        title: t('Trang cá nhân'),
        icon: PersonIcon,
        iconColor: {
          primary: colors.purple[500],
          secondary: colors.purple[50]
        },
        to: RoutePaths.user.root
      },
      {
        title: t('Đăng xuất'),
        icon: LogoutIcon,
        iconColor: {
          primary: colors.blue[500],
          secondary: colors.blue[50]
        },
        to: RoutePaths.home
      }
    ];
  }, [t]);

  const handleOpenMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {useInfo ? (
        <Box component="div" onMouseLeave={handleCloseMenu}>
          <Typography
            ref={anchorRef}
            onMouseEnter={handleOpenMenu}
            color="#fff"
            sx={{ textTransform: 'unset' }}
            component={Button}
            endIcon={<KeyboardArrowDownIcon />}
            variant="body1">
            {t('Xin chào')} {useInfo.username}
          </Typography>
          <AppSubMenu
            open={open}
            anchorEl={anchorRef.current}
            items={userSubMenu}
          />
        </Box>
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
            component={RouterLink}
            to={RoutePaths.login}>
            {t('Đăng nhập')}
          </Typography>
        </StyledButton>
      )}
    </>
  );
};

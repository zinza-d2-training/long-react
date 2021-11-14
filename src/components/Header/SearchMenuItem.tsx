import { Box, Button, colors, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppSubMenu, AppSubMenuItem } from '../ui';
import { RoutePaths } from '../../routes';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchMenuItem = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const searchSubMenu = useMemo<AppSubMenuItem[]>(() => {
    return [
      {
        title: t('Tra cứu chứng nhận tiêm'),
        description: t('Cập nhật nhanh, chính xác nhất'),
        iconColor: {
          primary: colors.purple[500],
          secondary: colors.purple[50]
        },
        to: RoutePaths.vaccineCertificate
      },
      {
        title: t('Tra cứu kết quả đăng ký'),
        description: t('Cập nhật nhanh, chính xác nhất'),
        iconColor: {
          primary: colors.blue[500],
          secondary: colors.blue[50]
        },
        to: RoutePaths.injectionRegistration
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
    <Box component="div" onMouseLeave={handleCloseMenu}>
      <Typography
        ref={anchorRef}
        onMouseEnter={handleOpenMenu}
        color="#fff"
        sx={{ textTransform: 'unset' }}
        component={Button}
        endIcon={<KeyboardArrowDownIcon />}
        variant="body1">
        {t('Tra cứu')}
      </Typography>
      <AppSubMenu
        open={open}
        anchorEl={anchorRef.current}
        items={searchSubMenu}
      />
    </Box>
  );
};

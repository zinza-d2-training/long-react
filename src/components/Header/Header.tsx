import { Box, Container, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { changeLanguageMode, i18nSelector } from 'store/slices/i18nSlice';
import { Link as RouterLink } from 'react-router-dom';
import { SearchMenuItem } from './SearchMenuItem';
import { UserMenuItem } from './UserMenuItem';

export const Header = () => {
  const languageMode = useAppSelector(i18nSelector).languageMode;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChangeToVn = useCallback(() => {
    dispatch(changeLanguageMode('vn'));
  }, [dispatch]);

  const handleChangeToEn = useCallback(() => {
    dispatch(changeLanguageMode('en'));
  }, [dispatch]);

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
          <Typography
            component={RouterLink}
            to={RoutePaths.home}
            variant="h6"
            color="#fff"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
            <Box component="img" src="images/logo_white.png" alt="" mr={2} />
            {t('CỔNG THÔNG TIN TIÊM CHỦNG COVID-19')}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={RouterLink}
              variant="body1"
              to={RoutePaths.home}>
              {t('Trang chủ')}
            </Typography>
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={RouterLink}
              variant="body1"
              to={RoutePaths.vaccineRegistration}>
              {t('Đăng ký tiêm')}
            </Typography>
            <SearchMenuItem />
            <Typography
              color="#fff"
              sx={{ textDecoration: 'none' }}
              component={RouterLink}
              variant="body1"
              to={RoutePaths.document}>
              {t('Tài liệu')}
            </Typography>
            <UserMenuItem />
            <Stack
              direction="row"
              sx={{ color: '#fff' }}
              spacing={1}
              justifyContent="space-between"
              alignItems="center">
              <Box
                sx={{
                  cursor: 'pointer',
                  textDecoration: languageMode === 'vn' ? 'underline' : 'none'
                }}
                onClick={handleChangeToVn}>
                VN
              </Box>
              <Box
                sx={{
                  height: '20px',
                  border: '1px solid #fff'
                }}
              />
              <Box
                sx={{
                  cursor: 'pointer',
                  textDecoration: languageMode === 'en' ? 'underline' : 'none'
                }}
                onClick={handleChangeToEn}>
                EN
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

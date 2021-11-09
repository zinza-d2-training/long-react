import { Box, Container, Stack, Typography } from '@mui/material';
import { StyledButton } from 'components';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: '#2D2188',
        height: '256px',
        pt: 4,
        color: '#fff'
      }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">
              {t(
                '© Bản quyền thuộc TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA'
              )}
            </Typography>
            <Typography variant="body2" mt="4px">
              {t('Phát triển bởi')}{' '}
              <Box component="span" sx={{ color: '#f00' }}>
                Viettel
              </Box>
            </Typography>
            <img src="images/logo2bo.png" alt="" />
          </Box>
          <Box>
            <Typography variant="body2" align="right">
              {t(
                'Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm'
              )}
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <StyledButton
                variant="outlined"
                sx={{ color: '#fff', borderColor: '#fff' }}>
                {t('App tiêm di động (Cho HCM)')}
              </StyledButton>
              <StyledButton
                variant="outlined"
                sx={{ color: '#fff', borderColor: '#fff' }}>
                App Store
              </StyledButton>
              <StyledButton
                variant="outlined"
                sx={{ color: '#fff', borderColor: '#fff' }}>
                Google Play
              </StyledButton>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" mt={2}>
              <img src="images/handle_cert.png" alt="" />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

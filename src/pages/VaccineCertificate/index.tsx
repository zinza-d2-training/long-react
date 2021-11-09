import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  colors,
  Container,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  CertificateInfo,
  Label,
  OtpDialog,
  PageTitle,
  StyledButton
} from 'components';
import { ICertificateSearch } from 'models';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styleInputMedium } from 'theme';
import { AppLayout } from 'theme/layout';
import { certificateData } from 'utils';
import { certificationSchema } from 'validations';

const defaultValues: ICertificateSearch = {
  fullName: '',
  dob: undefined,
  gender: 1,
  phone: '',
  citizenId: '',
  healthInsuranceCardNumber: ''
};

export const VaccineCertificate = () => {
  const { t } = useTranslation();
  const [searched, setSearched] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ICertificateSearch>({
    defaultValues,
    resolver: yupResolver(certificationSchema),
    mode: 'onTouched'
  });

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onSubmit: SubmitHandler<ICertificateSearch> = useCallback(
    (data) => {
      handleOpenModal();
    },
    [handleOpenModal]
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setSearched(true);
    handleCloseModal();
  }, [handleCloseModal]);

  const handleResetForm = useCallback(() => reset(), [reset]);
  return (
    <AppLayout>
      <PageTitle>{t('Tra cứu chứng nhận tiêm')}</PageTitle>
      <Box mb="86px">
        <Container maxWidth="xl">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            onReset={handleResetForm}>
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="fullName">
                  {t('Họ và tên')}
                </Label>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder={t('Họ và tên')}
                      id="fullName"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="dob">
                  {t('Ngày sinh')}
                </Label>
                <Controller
                  control={control}
                  name="dob"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder={t('Ngày/Tháng/Năm')}
                      type="date"
                      id="dob"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="gender">
                  {t('Giới tính')}
                </Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder="Giới tính"
                      id="gender"
                      select>
                      <MenuItem value={1}>{t('Nam')}</MenuItem>
                      <MenuItem value={0}>{t('Nữ')}</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="phone">
                  {t('Số điện thoại')}
                </Label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder={t('Số điện thoại')}
                      id="phone"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label htmlFor="citizenId">{t('Số CMND/CCCD')}</Label>
                <Controller
                  control={control}
                  name="citizenId"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder={t('Số CMND/CCCD')}
                      id="citizenId"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label htmlFor="healthInsuranceCardNumber">
                  {t('Số thẻ BHYT')}
                </Label>
                <Controller
                  control={control}
                  name="healthInsuranceCardNumber"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      sx={{ ...styleInputMedium, mt: '5px' }}
                      {...field}
                      error={invalid}
                      helperText={invalid && error?.message}
                      fullWidth
                      placeholder={t('Số thẻ BHYT')}
                      id="healthInsuranceCardNumber"
                    />
                  )}
                />
              </Box>
            </Stack>
            <Typography
              align="center"
              variant="body1"
              sx={{ fontStyle: 'italic', color: colors.red[600] }}
              mt={3}>
              <Box component="b">{t('Ghi chú')}</Box>:{' '}
              {t(
                'Nếu bạn đã tiêm nhưng chưa được ghi nhận, hãy liên hệ với cơ sở tiêm và đề nghị cập nhật thông tin lên Nền tảng tiêm chủng để có thể nhận được Chứng nhận tiêm hoặc phản ánh thông tin mũi tiêm'
              )}{' '}
              <Link
                sx={{
                  color: colors.red[600],
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textDecorationColor: colors.red[600]
                }}>
                {t('tại đây')}
              </Link>
              .
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
              <StyledButton
                variant="outlined"
                startIcon={<CachedIcon />}
                type="reset">
                {t('Nhập lại')}
              </StyledButton>
              <StyledButton
                variant="contained"
                startIcon={<SearchIcon />}
                type="submit">
                {t('Tra cứu')}
              </StyledButton>
            </Stack>
          </Box>
        </Container>
      </Box>
      <OtpDialog
        open={isOpenModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
      {searched && (
        <Container maxWidth="xl">
          <CertificateInfo data={certificateData} />
        </Container>
      )}
    </AppLayout>
  );
};

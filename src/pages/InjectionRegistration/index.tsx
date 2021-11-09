import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  colors,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { InjectionInfoTable, Label, PageTitle, StyledButton } from 'components';
import { IInjectionRegistration, IInjectionRegistrationForm } from 'models';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styleInputMedium } from 'theme';
import { AppLayout } from 'theme/layout';
import { fakeInjectionRegistration } from 'utils';
import { injectionRegistrationSchema } from 'validations';

const defaultValues: IInjectionRegistrationForm = {
  citizenId: '',
  phone: ''
};

export const InjectionRegistration = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<IInjectionRegistrationForm>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(injectionRegistrationSchema)
  });

  const [injectionRegistration, setInjectionRegistration] = useState<
    IInjectionRegistration[]
  >([]);

  const onSubmit: SubmitHandler<IInjectionRegistrationForm> = useCallback(
    (data) => {
      setInjectionRegistration(fakeInjectionRegistration);
    },
    []
  );

  const handleResetForm = useCallback(() => {
    reset();
    setInjectionRegistration([]);
  }, [reset]);

  return (
    <AppLayout>
      <PageTitle>{t('Tra cứu đăng ký tiêm')}</PageTitle>
      <Container maxWidth="xl">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleResetForm}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Label required>{t('Số CMND/CCCD/Mã định danh công dân')}</Label>
              <Controller
                control={control}
                name="citizenId"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    sx={styleInputMedium}
                    error={!!invalid}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Label required>{t('Số điện thoại')}</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    sx={styleInputMedium}
                    error={!!invalid}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
          </Stack>
          <Typography
            variant="body1"
            color={colors.red[600]}
            mt={3}
            sx={{ fontStyle: 'italic' }}
            align="center">
            <b>{t('Lưu ý')}:</b>{' '}
            {t(
              'Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!'
            )}
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
        <Box mt={14}>
          {!!injectionRegistration.length && (
            <InjectionInfoTable data={injectionRegistration} />
          )}
        </Box>
      </Container>
    </AppLayout>
  );
};

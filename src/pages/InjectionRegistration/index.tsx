import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  colors,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Label, PageTitle, StyledButton } from 'components';
import {
  IInjectionRegistration,
  IInjectionRegistrationForm,
  InjectionRegistrationStatus
} from 'models';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { styleInputMedium } from 'theme';
import { AppLayout } from 'theme/layout';
import { fakeInjectionRegistration } from 'utils';
import { injectionRegistrationSchema } from 'validations';

const defaultValues: IInjectionRegistrationForm = {
  citizenId: '',
  phone: ''
};

export const InjectionRegistration = () => {
  const { control, handleSubmit, reset } = useForm<IInjectionRegistrationForm>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(injectionRegistrationSchema)
  });

  const [injectionRegistration, setInjectionRegistration] = useState<
    IInjectionRegistration[]
  >([]);

  const onSubmit: SubmitHandler<IInjectionRegistrationForm> = (data) => {
    setInjectionRegistration(fakeInjectionRegistration);
  };

  const handleResetForm = () => {
    reset();
    setInjectionRegistration([]);
  };

  const dobs = useMemo(
    () => injectionRegistration.map((item) => item.dob.toLocaleDateString()),
    [injectionRegistration]
  );
  return (
    <AppLayout>
      <PageTitle>Tra cứu đăng ký tiêm</PageTitle>
      <Container maxWidth="xl">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleResetForm}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Label required>Số CMND/CCCD/Mã định danh công dân</Label>
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
              <Label required>Số điện thoại</Label>
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
            <b>Lưu ý:</b> Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ
            được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm
            khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
            <StyledButton
              variant="outlined"
              startIcon={<CachedIcon />}
              type="reset">
              Nhập lại
            </StyledButton>
            <StyledButton
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit">
              Tra cứu
            </StyledButton>
          </Stack>
        </Box>
        <Box mt={14}>
          {!!injectionRegistration.length && (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(238, 238, 238, 0.4)' }}>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Họ tên</TableCell>
                  <TableCell align="center">Ngày sinh</TableCell>
                  <TableCell align="center">Giới tính</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">
                    Số CMND/CCCD/Mã định danh công dân
                  </TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {injectionRegistration.map((record, index) => (
                  <TableRow key={record.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{record.fullName}</TableCell>
                    <TableCell align="center">{dobs[index]}</TableCell>
                    <TableCell align="center">
                      {record.gender === 1 ? 'Nam' : 'Nữ'}
                    </TableCell>
                    <TableCell align="center">{record.phone}</TableCell>
                    <TableCell align="center">{record.citizenId}</TableCell>
                    <TableCell align="center">
                      <Chip
                        variant="outlined"
                        color={
                          record.status === InjectionRegistrationStatus.SUCCESS
                            ? 'primary'
                            : 'error'
                        }
                        label={
                          record.status === InjectionRegistrationStatus.SUCCESS
                            ? 'Đăng ký thành công'
                            : 'Đăng ký chưa thành công'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">{record.operation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Container>
    </AppLayout>
  );
};

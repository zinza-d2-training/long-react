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
import StyledButton from 'components/Button';
import Label from 'components/Label';
import OtpDialog from 'components/OtpDialog';
import PageTitle from 'components/PageTitle';
import { ICertificateSearch } from 'models';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { styleInputMedium } from 'theme';
import { AppLayout } from 'theme/layout';
import { certificateData } from 'utils/fakeDataCertificate';
import { certificationSchema } from 'validations';
import CertificateInfo from './CertificateInfo';

const defaultValues: ICertificateSearch = {
  fullName: '',
  dob: undefined,
  gender: 1,
  phone: '',
  citizenId: '',
  healthInsuranceCardNumber: ''
};

const VaccineCertificate = () => {
  const [searched, setSearched] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ICertificateSearch>({
    defaultValues,
    resolver: yupResolver(certificationSchema),
    mode: 'onTouched'
  });

  const onSubmit: SubmitHandler<ICertificateSearch> = (data) => {
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleConfirm = () => {
    setSearched(true);
    handleCloseModal();
  };
  return (
    <AppLayout>
      <PageTitle>Tra cứu chứng nhận tiêm</PageTitle>
      <Box mb="86px">
        <Container maxWidth="xl">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => reset()}>
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="fullName">
                  Họ và tên
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
                      placeholder="Họ và tên"
                      id="fullName"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="dob">
                  Ngày sinh
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
                      placeholder="Ngày/Tháng/Năm"
                      type="date"
                      id="dob"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="gender">
                  Giới tính
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
                      <MenuItem value={1}>Nam</MenuItem>
                      <MenuItem value={0}>Nữ</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label required htmlFor="phone">
                  Số điện thoại
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
                      placeholder="Số điện thoại"
                      id="phone"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label htmlFor="citizenId">Số CMND/CCCD</Label>
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
                      placeholder="Số CMND/CCCD"
                      id="citizenId"
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Label htmlFor="healthInsuranceCardNumber">Số thẻ BHYT</Label>
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
                      placeholder="Số thẻ BHYT"
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
              <Box component="b">Ghi chú</Box>: Nếu bạn đã tiêm nhưng chưa được
              ghi nhận, hãy liên hệ với cơ sở tiêm và đề nghị cập nhật thông tin
              lên Nền tảng tiêm chủng để có thể nhận được Chứng nhận tiêm hoặc
              phản ánh thông tin mũi tiêm{' '}
              <Link
                sx={{
                  color: colors.red[600],
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                tại đây
              </Link>
              .
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

export default VaccineCertificate;

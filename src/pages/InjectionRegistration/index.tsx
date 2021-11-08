import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  colors,
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Label, PageTitle, StyledButton, StyledDialogTitle } from 'components';
import {
  IInjectionRegistration,
  IInjectionRegistrationForm,
  InjectionRegistrationStatus
} from 'models';
import { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { styleInputMedium } from 'theme';
import { AppLayout } from 'theme/layout';
import { fakeInjectionRegistration, injectionRegistrationProcess } from 'utils';
import { injectionRegistrationSchema } from 'validations';

const defaultValues: IInjectionRegistrationForm = {
  citizenId: '',
  phone: ''
};

const Row = (props: {
  data: IInjectionRegistration;
  index: number;
  onOpenDialog: (data: IInjectionRegistration) => void;
}) => {
  const { data, index, onOpenDialog } = props;

  const dobs = useMemo(() => data.dob.toLocaleDateString(), [data.dob]);
  const handleClickButton = useCallback(
    () => onOpenDialog(data),
    [data, onOpenDialog]
  );
  return (
    <TableRow sx={index % 2 !== 0 ? { backgroundColor: colors.grey[100] } : {}}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{data.fullName}</TableCell>
      <TableCell align="center">{dobs}</TableCell>
      <TableCell align="center">{data.gender === 1 ? 'Nam' : 'Nữ'}</TableCell>
      <TableCell align="center">{data.phone}</TableCell>
      <TableCell align="center">{data.citizenId}</TableCell>
      <TableCell align="center">
        <Chip
          variant="outlined"
          color={
            data.status === InjectionRegistrationStatus.SUCCESS
              ? 'primary'
              : 'error'
          }
          label={
            data.status === InjectionRegistrationStatus.SUCCESS
              ? 'Đăng ký thành công'
              : 'Đăng ký chưa thành công'
          }
        />
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={handleClickButton}>
          <InfoOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const Info = (props: {
  data: IInjectionRegistration | null;
  onClose: () => void;
}) => {
  const dob = useMemo(
    () => props.data?.dob.toLocaleDateString(),
    [props.data?.dob]
  );

  return (
    <>
      <Typography variant="h6" mb={2}>
        Thông tin cá nhân
      </Typography>
      <Stack direction="row" spacing={0}>
        <Box sx={{ flex: 1, minWidth: '188px' }}>
          <Typography variant="body1">Họ và tên</Typography>
          <Typography variant="body1" fontWeight="500">
            {props.data?.fullName}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: '188px' }}>
          <Typography variant="body1">Ngày sinh</Typography>
          <Typography variant="body1" fontWeight="500">
            {dob}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: '188px' }}>
          <Typography variant="body1">Số điện thoại</Typography>
          <Typography variant="body1" fontWeight="500">
            {props.data?.phone}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: '188px' }}>
          <Typography variant="body1">Số CMND/CCCD</Typography>
          <Typography variant="body1" fontWeight="500">
            {props.data?.citizenId}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="h6" py={2}>
        Quá trình xử lý
      </Typography>
      <Stepper activeStep={props.data?.process} alternativeLabel>
        {injectionRegistrationProcess.map(({ id, label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack direction="row" justifyContent="center" p={2}>
        <StyledButton variant="contained" onClick={props.onClose}>
          Xác nhận
        </StyledButton>
      </Stack>
    </>
  );
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

  const [selectedInfo, setSelectedInfo] =
    useState<IInjectionRegistration | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleChangeSelectedInfo = useCallback(
    (data: IInjectionRegistration) => {
      setSelectedInfo(data);
      setOpenDialog(true);
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

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
                  <Row
                    key={record.id}
                    data={record}
                    index={index}
                    onOpenDialog={handleChangeSelectedInfo}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
          <StyledDialogTitle
            title="Theo dõi lịch sử đăng ký tiêm"
            onClose={handleCloseDialog}
          />
          <Divider />
          <DialogContent sx={{ p: 0, px: 3, pt: 3 }}>
            <Info data={selectedInfo} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </Container>
    </AppLayout>
  );
};

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import Label from 'components/Label';
import { IRegisterForm } from 'models/register';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  onBackStep: () => void;
  onNextStep: () => void;
}

const Step2 = (props: IProps) => {
  const { onBackStep, onNextStep } = props;
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext<IRegisterForm>();
  const disableButton =
    !!errors.fullName ||
    !!errors.dob ||
    !!errors.gender ||
    !!errors.phoneNumber ||
    !watch('fullName') ||
    !watch('dob') ||
    !watch('phoneNumber');
  return (
    <Stack spacing={2}>
      <Box>
        <Label required>Họ và tên</Label>
        <Controller
          name="fullName"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Họ và tên"
              sx={styleInputLarge}
              fullWidth
              {...field}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Box>
      <Box>
        <Label required>Ngày sinh</Label>
        <Controller
          name="dob"
          control={control}
          defaultValue={new Date()}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Ngày/Tháng/Năm"
              sx={styleInputLarge}
              fullWidth
              type="date"
              {...field}
              autoComplete=""
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Box>
      <Box>
        <Label required>Giới tinh</Label>
        <Controller
          name="gender"
          control={control}
          defaultValue={1}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Giới tinh"
              sx={styleInputLarge}
              fullWidth
              {...field}
              error={invalid}
              helperText={error?.message}
              select>
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <Box>
        <Label required>Số điện thoại</Label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Số điện thoại"
              sx={styleInputLarge}
              fullWidth
              {...field}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          pt: 1
        }}>
        <Button
          onClick={onBackStep}
          startIcon={<ArrowBackIcon />}
          sx={{ color: (theme) => theme.palette.text.primary }}>
          Quay lại
        </Button>
        <Button
          type={'button'}
          disabled={disableButton}
          onClick={onNextStep}
          endIcon={<ArrowForwardIcon />}>
          Tiếp tục
        </Button>
      </Box>
    </Stack>
  );
};

export default Step2;

import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ErrorMessage from 'components/ErrorMessage';
import Label from 'components/Label';
import { IRegisterForm } from 'models/register';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch
} from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  control: Control<IRegisterForm, object>;
  errors: FieldErrors<IRegisterForm>;
  watch: UseFormWatch<IRegisterForm>;
  onBackStep: () => void;
  onNextStep: () => void;
}

const Step2 = (props: IProps) => {
  const { control, errors, onBackStep, onNextStep, watch } = props;
  const disableButton =
    !!errors.fullName ||
    !!errors.dob ||
    !!errors.gender ||
    !!errors.phoneNumber ||
    !watch('fullName') ||
    !watch('dob') ||
    !watch('gender') ||
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
          defaultValue="Nam"
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              placeholder="Giới tinh"
              sx={styleInputLarge}
              fullWidth
              {...field}
              error={invalid}
              helperText={error?.message}
              select>
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
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

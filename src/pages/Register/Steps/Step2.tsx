import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import ErrorMessage from 'components/ErrorMessage';
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
    !watch('gender') ||
    !watch('phoneNumber');
  return (
    <>
      <Box>
        <Label required htmlFor="fullName">
          Họ và tên
        </Label>
        <Controller
          name="fullName"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="Họ và tên"
              sx={styleInputLarge}
              fullWidth
              {...field}
              id="fullName"
            />
          )}
        />
        <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
      </Box>
      <Box mt={1}>
        <Label required>Ngày sinh</Label>
        <Controller
          name="dob"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <TextField
              placeholder="Ngày/Tháng/Năm"
              sx={styleInputLarge}
              fullWidth
              type="date"
              {...field}
              autoComplete=""
            />
          )}
        />
        <ErrorMessage>{errors.dob?.message}</ErrorMessage>
      </Box>
      <Box mt={1}>
        <Label required>Giới tinh</Label>
        <Controller
          name="gender"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <TextField
              placeholder="Giới tinh"
              sx={styleInputLarge}
              fullWidth
              {...field}
              select>
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
            </TextField>
          )}
        />
        <ErrorMessage>{errors.gender?.message}</ErrorMessage>
      </Box>
      <Box mb={2} mt={1}>
        <Label required>Số điện thoại</Label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              placeholder="Số điện thoại"
              sx={styleInputLarge}
              fullWidth
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
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
    </>
  );
};

export default Step2;

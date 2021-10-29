import { Box, MenuItem, TextField } from '@mui/material';
import ErrorMessage from 'components/ErrorMessage';
import Label from 'components/Label';
import { IRegisterForm } from 'models/register';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  control: Control<IRegisterForm, object>;
  errors: FieldErrors<IRegisterForm>;
}

const Step2 = (props: IProps) => {
  const { control, errors } = props;
  console.log(errors);
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
        {errors.fullName?.message && (
          <ErrorMessage>{errors.fullName.message}</ErrorMessage>
        )}
      </Box>
      <Box mt={2}>
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
        {errors.dob?.message && (
          <ErrorMessage>{errors.dob.message}</ErrorMessage>
        )}
      </Box>
      <Box mt={2}>
        <Label required>Giới tinh</Label>
        <Controller
          name="gender"
          control={control}
          defaultValue="Nam"
          render={({ field }) => (
            <TextField
              placeholder="Giới tinh"
              sx={styleInputLarge}
              fullWidth
              {...field}
              select>
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </TextField>
          )}
        />
        {errors.gender?.message && (
          <ErrorMessage>{errors.gender.message}</ErrorMessage>
        )}
      </Box>
      <Box my={2}>
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
        {errors.phoneNumber?.message && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}
      </Box>
    </>
  );
};

export default Step2;

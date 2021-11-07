import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Stack, TextField } from '@mui/material';
import { ErrorMessage, FileInput, Label } from 'components';
import { IRegisterForm } from 'models/register';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputLarge } from 'theme';

interface IProps {
  onNextStep: () => void;
}

export const Step1 = (props: IProps) => {
  const { onNextStep } = props;
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext<IRegisterForm>();

  const disableButton =
    !!errors.citizenId ||
    !!errors.citizenImages ||
    !watch('citizenId') ||
    !watch('citizenImages').length;

  return (
    <Stack width="100%" spacing={2}>
      <Box>
        <Label required htmlFor="citizenId">
          Số CMND/CCCD
        </Label>
        <Controller
          name="citizenId"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              sx={styleInputLarge}
              fullWidth
              placeholder="Số CMND/CCCD"
              {...field}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Box>
      <Box>
        <Label mb={1} sx={{ display: 'block' }} htmlFor="citizenImages">
          Ảnh chụp CMND/CCCD 2 mặt
        </Label>
        <FileInput />
        <ErrorMessage>{errors.citizenImages?.message}</ErrorMessage>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%'
        }}
        pt={1}>
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

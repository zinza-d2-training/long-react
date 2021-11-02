import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Button,
  Stack,
  TextField
} from '@mui/material';
import Label from 'components/Label';
import { IDistrict, IProvince, IWard } from 'models';
import { IRegisterForm } from 'models/register';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputLarge } from 'theme';
import { addressData } from 'utils/addressData';

interface IProps {
  onBackStep: () => void;
}

const Step3 = (props: IProps) => {
  const { onBackStep } = props;
  const {
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, touchedFields }
  } = useFormContext<IRegisterForm>();

  const selectedProvince: number = watch('provinceId');
  const selectedDistrict: number = watch('districtId');
  const selectedWard: number = watch('wardId');
  const [provinceOptions] = useState<IProvince[]>(addressData);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
  const [wardOptions, setWardOptions] = useState<IWard[]>([]);
  const [districtInputValue, setDistrictInputValue] = useState<string>('');
  const [wardInputValue, setWardInputValue] = useState<string>('');

  const disableButton =
    !!errors.provinceId ||
    !!errors.districtId ||
    !!errors.wardId ||
    watch('provinceId') === -1 ||
    watch('districtId') === -1 ||
    watch('wardId') === -1;

  useEffect(() => {
    if (selectedProvince === -1) {
      setError('provinceId', { message: 'Trường này là bắt buộc' });
      setValue('districtId', -1);
      setValue('wardId', -1);
    } else {
      clearErrors('provinceId');
    }

    if (selectedDistrict === -1) {
      setError('districtId', { message: 'Trường này là bắt buộc' });
      setValue('wardId', -1);
      setDistrictInputValue('');
    } else {
      setDistrictInputValue((prevState) => {
        const district = districtOptions.find(
          ({ id }) => id === selectedDistrict
        );
        return district ? district.label : '';
      });
      clearErrors('districtId');
    }

    if (selectedWard === -1) {
      setError('wardId', { message: 'Trường này là bắt buộc' });
      setWardInputValue('');
    } else {
      setWardInputValue((prevState) => {
        const ward = wardOptions.find(({ id }) => id === selectedWard);
        return ward ? ward.label : '';
      });
      clearErrors('wardId');
    }
  }, [
    clearErrors,
    districtOptions,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setError,
    setValue,
    wardOptions
  ]);

  useEffect(() => {
    if (selectedProvince > -1) {
      setDistrictOptions((prevState) => {
        const provinceIndex = provinceOptions.findIndex(
          ({ id }) => selectedProvince === id
        );
        setValue('districtId', -1);
        if (provinceIndex > -1) {
          return provinceOptions[provinceIndex].children;
        } else {
          return [];
        }
      });
    } else {
      setDistrictOptions([]);
    }
  }, [provinceOptions, selectedProvince, setValue]);

  useEffect(() => {
    if (selectedDistrict > -1) {
      setWardOptions((prevState) => {
        const districtIndex = districtOptions.findIndex(
          ({ id }) => id === selectedDistrict
        );
        setValue('wardId', -1);
        if (districtIndex > -1) {
          return districtOptions[districtIndex].children;
        } else {
          return [];
        }
      });
    } else {
      setWardOptions([]);
    }
  }, [districtOptions, selectedDistrict, setValue]);
  return (
    <Stack spacing={2}>
      <Box>
        <Label required>Tỉnh/Thành phố</Label>
        <Controller
          control={control}
          name="provinceId"
          render={({ field, fieldState: { error, invalid } }) => {
            const valueAutocomplete = provinceOptions.find(
              ({ id }) => id === field.value
            );
            return (
              <Autocomplete
                options={provinceOptions}
                {...field}
                value={valueAutocomplete}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  value: IProvince | null,
                  reason: AutocompleteChangeReason
                ) => {
                  setValue('provinceId', value ? value.id : -1);
                  setFocus('provinceId');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={styleInputLarge}
                    placeholder="Tỉnh/Thành phố"
                    error={invalid && touchedFields.provinceId}
                    helperText={
                      touchedFields.provinceId && invalid && error?.message
                    }
                  />
                )}
              />
            );
          }}
        />
      </Box>
      <Box>
        <Label required>Quận/Huyện</Label>
        <Controller
          control={control}
          name="districtId"
          render={({ field, fieldState: { invalid, error } }) => {
            const valueAutocomplete = districtOptions.find(
              ({ id }) => id === field.value
            );
            return (
              <Autocomplete
                options={districtOptions}
                {...field}
                value={valueAutocomplete}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  value: IDistrict | null,
                  reason: AutocompleteChangeReason
                ) => {
                  setValue('districtId', value ? value.id : -1);
                  setFocus('districtId');
                }}
                disabled={selectedProvince === -1}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Quận/Huyện"
                    sx={styleInputLarge}
                    onChange={(e) => {
                      setDistrictInputValue(e.target.value);
                    }}
                    inputProps={{
                      ...params.inputProps,
                      value: districtInputValue
                    }}
                    error={invalid && touchedFields.districtId}
                    helperText={
                      invalid && touchedFields.districtId && error?.message
                    }
                  />
                )}
              />
            );
          }}
        />
      </Box>
      <Box>
        <Label required>Xã/Phường</Label>
        <Controller
          control={control}
          name="wardId"
          render={({ field, fieldState: { error, invalid } }) => {
            const valueAutocomplete = wardOptions.find(
              ({ id }) => id === field.value
            );
            return (
              <Autocomplete
                options={wardOptions}
                {...field}
                value={valueAutocomplete}
                disabled={selectedDistrict === -1}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  value: IWard | null,
                  reason: AutocompleteChangeReason
                ) => {
                  setValue('wardId', value ? value.id : -1);
                  setFocus('wardId');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Quận/Huyện"
                    sx={styleInputLarge}
                    onChange={(e) => setWardInputValue(e.target.value)}
                    inputProps={{ ...params.inputProps, value: wardInputValue }}
                    error={invalid && touchedFields.wardId}
                    helperText={
                      invalid && touchedFields.wardId && error?.message
                    }
                  />
                )}
              />
            );
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          pt: 1
        }}
        mt={2}>
        <Button
          onClick={onBackStep}
          startIcon={<ArrowBackIcon />}
          sx={{ color: (theme) => theme.palette.text.primary }}>
          Quay lại
        </Button>
        <Button
          type={'submit'}
          disabled={disableButton}
          endIcon={<ArrowForwardIcon />}>
          Tiếp tục
        </Button>
      </Box>
    </Stack>
  );
};

export default Step3;

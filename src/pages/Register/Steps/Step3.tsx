import {
  Autocomplete,
  Box,
  TextField,
  AutocompleteChangeReason,
  Button
} from '@mui/material';
import { IRegisterForm } from 'models/register';
import { SyntheticEvent, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Control,
  FieldErrors,
  UseFormWatch,
  Controller,
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
  FieldNamesMarkedBoolean
} from 'react-hook-form';

import { ICity, IDistrict, IWard } from 'models';
import { addressData } from 'utils/addressData';
import Label from 'components/Label';
import ErrorMessage from 'components/ErrorMessage';
import { styleInputLarge } from 'theme';

interface IProps {
  watch: UseFormWatch<IRegisterForm>;
  control: Control<IRegisterForm, object>;
  errors: FieldErrors<IRegisterForm>;
  setValue: UseFormSetValue<IRegisterForm>;
  setError: UseFormSetError<IRegisterForm>;
  clearErrors: UseFormClearErrors<IRegisterForm>;
  touchedFields: FieldNamesMarkedBoolean<IRegisterForm>;
  onBackStep: () => void;
}

const Step3 = (props: IProps) => {
  const {
    watch,
    control,
    errors,
    setValue,
    onBackStep,
    setError,
    clearErrors,
    touchedFields
  } = props;
  const selectedCity = watch('cityProvince');
  const selectedDistrict = watch('district');
  const selectedWard = watch('wards');
  const [cities] = useState<ICity[]>(addressData);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);

  const disableButton =
    !!errors.cityProvince ||
    !!errors.district ||
    !!errors.wards ||
    !watch('cityProvince') ||
    !watch('district') ||
    !watch('wards');

  useEffect(() => {
    if (!selectedDistrict.trim()) {
      setError('district', { message: 'Trường này là bắt buộc' });
    } else {
      clearErrors('district');
    }
    if (!selectedCity.trim()) {
      setError('cityProvince', { message: 'Trường này là bắt buộc' });
    } else {
      clearErrors('cityProvince');
    }
    if (!selectedWard.trim()) {
      setError('wards', { message: 'Trường này là bắt buộc' });
    } else {
      clearErrors('wards');
    }
  }, [clearErrors, selectedCity, selectedDistrict, selectedWard, setError]);

  useEffect(() => {
    if (selectedCity) {
      const cityIndex = addressData.findIndex(
        (city) => city.id === selectedCity
      );
      setValue('district', '');
      setValue('wards', '');
      if (cityIndex > -1) {
        setDistricts(addressData[cityIndex].children);
      } else {
        setDistricts([]);
      }
    }
  }, [districts, selectedCity, setValue]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtIndex = districts.findIndex(
        (district) => district.id === selectedDistrict
      );
      setValue('wards', '');
      if (districtIndex > -1) {
        setWards(districts[districtIndex].children);
      } else {
        setWards([]);
      }
    }
  }, [districts, selectedDistrict, setValue]);
  return (
    <>
      <Box>
        <Label required>Tỉnh/Thành phố</Label>
        <Controller
          control={control}
          name="cityProvince"
          defaultValue={watch('cityProvince')}
          render={({ field: { value, ...formField } }) => {
            const inputValue = cities.find(({ id }) => id === value);
            return (
              <Autocomplete
                options={cities}
                {...formField}
                value={inputValue}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  newValue: ICity | null,
                  reason: AutocompleteChangeReason
                ) => {
                  if (newValue) {
                    setValue('cityProvince', newValue.id);
                  }
                }}
                onInputChange={(
                  event: React.SyntheticEvent,
                  value: string,
                  reason: string
                ) => {
                  if (!value.trim()) {
                    setValue('cityProvince', '');
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={watch('cityProvince')}
                    sx={styleInputLarge}
                    placeholder="Tỉnh/Thành phố"
                  />
                )}
              />
            );
          }}
        />
        <ErrorMessage>
          {touchedFields.cityProvince && errors.cityProvince?.message}
        </ErrorMessage>
      </Box>
      <Box mt={2}>
        <Label required>Quận/Huyện</Label>
        <Controller
          control={control}
          name="district"
          defaultValue={watch('district')}
          render={({ field: { value, ...formField } }) => {
            const inputValue = districts.find(({ id }) => id === value);
            return (
              <Autocomplete
                options={districts}
                {...formField}
                value={inputValue}
                disabled={!watch('cityProvince')}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  newValue: IDistrict | null,
                  reason: AutocompleteChangeReason
                ) => {
                  if (newValue) {
                    setValue('district', newValue.id);
                  }
                }}
                onInputChange={(
                  event: React.SyntheticEvent,
                  value: string,
                  reason: string
                ) => {
                  setValue('district', value);
                }}
                renderInput={(params) => {
                  if (!watch('district')) {
                    // @ts-ignore
                    params.inputProps.value = '';
                  }
                  return (
                    <TextField
                      {...params}
                      sx={styleInputLarge}
                      placeholder="Quận/huyện"
                    />
                  );
                }}
              />
            );
          }}
        />
        <ErrorMessage>
          {touchedFields.district && errors.district?.message}
        </ErrorMessage>
      </Box>
      <Box mt={2}>
        <Label required>Xã/Phường</Label>
        <Controller
          control={control}
          name="wards"
          defaultValue={watch('wards')}
          render={({ field: { value, ...formField } }) => {
            const inputValue = wards.find(({ id }) => id === value);
            return (
              <Autocomplete
                options={wards}
                value={inputValue}
                disabled={!watch('district')}
                {...formField}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  newValue: IWard | null,
                  reason: AutocompleteChangeReason
                ) => {
                  if (newValue) {
                    setValue('wards', newValue.id);
                  }
                }}
                onInputChange={(
                  event: React.SyntheticEvent,
                  value: string,
                  reason: string
                ) => {
                  setValue('wards', value);
                }}
                renderInput={(params) => {
                  if (!watch('wards')) {
                    // @ts-ignore
                    params.inputProps.value = '';
                  }
                  return (
                    <TextField
                      {...params}
                      sx={styleInputLarge}
                      placeholder="Xã/Phường"
                    />
                  );
                }}
              />
            );
          }}
        />
        <ErrorMessage>
          {touchedFields.wards && errors.wards?.message}
        </ErrorMessage>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
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
    </>
  );
};

export default Step3;

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
  UseFormSetValue
} from 'react-hook-form';

import { ICity, IDistrict, IWard } from 'models';
import { addressData } from 'utils/addressData';
import Label from 'components/Label';
import ErrorMessage from 'components/ErrorMessage';

interface IProps {
  watch: UseFormWatch<IRegisterForm>;
  control: Control<IRegisterForm, object>;
  errors: FieldErrors<IRegisterForm>;
  setValue: UseFormSetValue<IRegisterForm>;
  onBackStep: () => void;
}

const Step3 = (props: IProps) => {
  const { watch, control, errors, setValue, onBackStep } = props;
  const selectedCity = watch('cityProvince');
  const selectedDistrict = watch('district');
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
    if (selectedCity) {
      const cityIndex = addressData.findIndex(
        (city) => city.id === selectedCity
      );
      setDistricts(addressData[cityIndex].children);
      setValue('district', '');
      setValue('wards', '');
    }
  }, [districts, selectedCity, setValue]);

  useEffect(() => {
    if (selectedDistrict) {
      const districtIndex = districts.findIndex(
        (district) => district.id === selectedDistrict
      );
      setWards(districts[districtIndex].children);
      setValue('wards', '');
    }
  }, [districts, selectedDistrict, setValue]);
  return (
    <>
      <Box>
        <Label required>Tỉnh/Thành phố</Label>
        <Controller
          control={control}
          name="cityProvince"
          defaultValue=""
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
                  <TextField {...params} placeholder="Tỉnh/Thành phố" />
                )}
              />
            );
          }}
        />
        {errors.cityProvince && (
          <ErrorMessage>{errors.cityProvince.message}</ErrorMessage>
        )}
      </Box>
      <Box mt={2}>
        <Label required>Quận/Huyện</Label>
        <Controller
          control={control}
          name="district"
          render={({ field: { value, ...formField } }) => {
            const inputValue = districts.find(({ id }) => id === value);
            return (
              <Autocomplete
                options={districts}
                {...formField}
                value={inputValue}
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
                  if (!value.trim()) {
                    setValue('district', '');
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Quận/huyện" />
                )}
              />
            );
          }}
        />
        {errors.district && (
          <ErrorMessage>{errors.district.message}</ErrorMessage>
        )}
      </Box>
      <Box mt={2}>
        <Label required>Xã/Phường</Label>
        <Controller
          control={control}
          name="wards"
          render={({ field: { value, ...formField } }) => {
            const inputValue = wards.find(({ id }) => id === value);
            return (
              <Autocomplete
                options={wards}
                value={inputValue}
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
                  if (!value.trim()) {
                    setValue('wards', '');
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Xã/Phường" />
                )}
              />
            );
          }}
        />
        {errors.wards && <ErrorMessage>{errors.wards.message}</ErrorMessage>}
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

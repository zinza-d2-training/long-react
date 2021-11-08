import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { AutocompleteChangeReason } from '@mui/core';
import { Label } from 'components';
import { IDistrict, IProvince, IUserInfoForm, IWard } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputMedium } from 'theme';
import { addressData } from 'utils';

export const AddressInput = (props: { editable: boolean }) => {
  const { control, watch, setValue, setError, clearErrors } =
    useFormContext<IUserInfoForm>();

  const selectedProvinceId = watch('provinceId');
  const selectedDistrictId = watch('districtId');
  const selectedWardId = watch('wardId');
  const [provinceOptions] = useState<IProvince[]>(addressData);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>(
    () =>
      provinceOptions.find((province) => province.id === watch('provinceId'))
        ?.children || []
  );
  const [wardOptions, setWardOptions] = useState<IWard[]>(
    () =>
      districtOptions.find((district) => district.id === watch('districtId'))
        ?.children || []
  );

  useEffect(() => {
    if (selectedProvinceId === -1) {
      setError('provinceId', { message: 'Trường này không được bỏ trống' });
    } else {
      setDistrictOptions((prevState) => {
        const province = provinceOptions.find(
          ({ id }) => id === selectedProvinceId
        );
        if (province) {
          return province.children;
        } else {
          return [];
        }
      });
      setWardOptions([]);
      clearErrors('provinceId');
    }
  }, [clearErrors, provinceOptions, selectedProvinceId, setError]);

  useEffect(() => {
    if (selectedDistrictId === -1) {
      setError('districtId', { message: 'Trường này không được bỏ trống' });
    } else {
      setWardOptions((prevState) => {
        const district = districtOptions.find(
          ({ id }) => id === selectedDistrictId
        );
        if (district) {
          return district.children;
        } else {
          return [];
        }
      });
      clearErrors('districtId');
    }
  }, [
    clearErrors,
    districtOptions,
    selectedDistrictId,
    selectedProvinceId,
    setError
  ]);

  useEffect(() => {
    if (selectedWardId === -1) {
      setError('wardId', { message: 'Trường này không được bỏ trống' });
    } else {
      clearErrors('wardId');
    }
  }, [clearErrors, selectedWardId, setError]);

  const handleChangeProvinceId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IProvince | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('provinceId', value?.id || -1);
      setValue('districtId', -1);
      setValue('wardId', -1);
    },
    [setValue]
  );

  const handleChangeDistrictId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IDistrict | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('districtId', value?.id || -1);
      setValue('wardId', -1);
    },
    [setValue]
  );

  const handleChangeWardId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IWard | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('wardId', value?.id || -1);
    },
    [setValue]
  );
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Box>
        <Label>Tỉnh/Thành phố</Label>
        <Controller
          control={control}
          name="provinceId"
          render={({ field, fieldState: { invalid, error } }) => {
            const autocompleteValue = provinceOptions.find(
              (province) => province.id === watch('provinceId')
            );
            return (
              <Autocomplete
                options={provinceOptions}
                value={autocompleteValue}
                disabled={!props.editable}
                onChange={handleChangeProvinceId}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Tỉnh/Thành phố"
                      sx={{
                        ...styleInputMedium,
                        width: '322px',
                        '.MuiOutlinedInput-root .MuiAutocomplete-input': {
                          pl: '10px !important'
                        }
                      }}
                    />
                  );
                }}
              />
            );
          }}
        />
      </Box>
      <Box>
        <Label>Quận/Huyện</Label>
        <Controller
          control={control}
          name="districtId"
          render={({ field, fieldState: { invalid, error } }) => {
            const autocompleteValue = districtOptions.find(
              (district) => district.id === watch('districtId')
            );
            return (
              <Autocomplete
                options={districtOptions}
                value={autocompleteValue}
                onChange={handleChangeDistrictId}
                disabled={!props.editable}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Quận/Huyện"
                      sx={{
                        ...styleInputMedium,
                        width: '322px',
                        '.MuiOutlinedInput-root .MuiAutocomplete-input': {
                          pl: '10px !important'
                        }
                      }}
                    />
                  );
                }}
              />
            );
          }}
        />
      </Box>
      <Box>
        <Label>Phường/Xã</Label>
        <Controller
          control={control}
          name="wardId"
          render={({ field, fieldState: { invalid, error } }) => {
            const autocompleteValue = wardOptions.find(
              (ward) => ward.id === watch('wardId')
            );
            return (
              <Autocomplete
                options={wardOptions}
                value={autocompleteValue}
                disabled={!props.editable}
                onChange={handleChangeWardId}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Phường/Xã"
                      sx={{
                        ...styleInputMedium,
                        width: '322px',
                        '.MuiOutlinedInput-root .MuiAutocomplete-input': {
                          pl: '10px !important'
                        }
                      }}
                    />
                  );
                }}
              />
            );
          }}
        />
      </Box>
    </Stack>
  );
};

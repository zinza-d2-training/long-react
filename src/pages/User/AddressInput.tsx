import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { AutocompleteChangeReason } from '@mui/core';
import { Label } from 'components';
import { IDistrict, IProvince, IUserInfoForm, IWard } from 'models';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { styleInputMedium } from 'theme';
import { addressData } from 'utils';

export const AddressInput = (props: { editable: boolean }) => {
  const { control, watch, setValue, setError, clearErrors } =
    useFormContext<IUserInfoForm>();

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
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  value: IProvince | null,
                  reason: AutocompleteChangeReason
                ) => {
                  if (!value) {
                    setError('provinceId', {
                      message: 'Trường này không được bỏ trống'
                    });
                  } else {
                    clearErrors('provinceId');
                  }
                  setValue('provinceId', value?.id || -1);
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Tỉnh/Thành phố"
                      sx={{ ...styleInputMedium, width: '322px' }}
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
                disabled={!props.editable}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Quận/Huyện"
                      sx={{ ...styleInputMedium, width: '322px' }}
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
                getOptionLabel={(option) => option.label}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      error={invalid}
                      helperText={error?.message}
                      placeholder="Phường/Xã"
                      sx={{ ...styleInputMedium, width: '322px' }}
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

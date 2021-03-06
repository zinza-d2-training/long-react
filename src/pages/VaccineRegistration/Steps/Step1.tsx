import { yupResolver } from '@hookform/resolvers/yup';
import { AutocompleteChangeReason } from '@mui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Autocomplete,
  Box,
  colors,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Label, StyledButton } from 'components';
import { IDistrict, IProvince, IVaccineRegistration, IWard } from 'models';
import { ICountry } from 'models/country';
import { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styleInputMedium } from 'theme';
import { addressData, countriesData, vaccineData } from 'utils';
import { vaccineRegistrationSchema } from 'validations';

const defaultValues: IVaccineRegistration = {
  injectionTime: 0,
  registrantInfo: {
    fullName: '',
    dob: null,
    gender: -1,
    phone: '',
    email: '',
    citizenId: '',
    healthInsuranceCardNumber: '',
    job: '',
    workUnit: '',
    currentAddress: '',
    provinceId: -1,
    districtId: -1,
    wardId: -1,
    ethnic: '',
    nationality: null,
    priorityGroup: -1
  },
  vaccinationRegistrationInfo: {
    injectionDate: null,
    injectionTime: -1
  },
  historyOfFirstInjection: {
    vaccineId: -1,
    injectionDate: null,
    shipmentNumber: '',
    vaccinePlace: '',
    postVaccinationReaction: ''
  }
};

interface IProps {
  onNextStep: () => void;
  onChangePersonalInfo: (info: IVaccineRegistration) => void;
}

export const Step1 = (props: IProps) => {
  const { t } = useTranslation();
  const { onNextStep, onChangePersonalInfo } = props;
  const { control, handleSubmit, setValue, setFocus, watch, clearErrors } =
    useForm<IVaccineRegistration>({
      defaultValues,
      mode: 'onChange',
      resolver: yupResolver(vaccineRegistrationSchema)
    });
  const injectionTime = watch('injectionTime');
  const provinceId = watch('registrantInfo.provinceId');
  const districtId = watch('registrantInfo.districtId');
  const wardId = watch('registrantInfo.wardId');
  const [provinceOptions] = useState<IProvince[]>(addressData);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
  const [wardOptions, setWardOptions] = useState<IWard[]>([]);
  const [inputProvince, setInputProvince] = useState('');
  const [inputDistrict, setInputDistrict] = useState('');
  const [inputWard, setInputWard] = useState('');

  useEffect(() => {
    if (injectionTime !== 2) {
      setValue('historyOfFirstInjection.vaccineId', -1);
      setValue('historyOfFirstInjection.injectionDate', null);
      setValue('historyOfFirstInjection.shipmentNumber', '');
      setValue('historyOfFirstInjection.vaccinePlace', '');
    }
  }, [injectionTime, setValue]);

  useEffect(() => {
    if (provinceId !== -1) {
      clearErrors('registrantInfo.provinceId');
      setDistrictOptions((prevState) => {
        const province = provinceOptions.find(({ id }) => id === provinceId);
        if (province) {
          return province.children;
        } else {
          return [];
        }
      });
    }
    setInputDistrict('');
    setInputWard('');
    setValue('registrantInfo.districtId', -1);
    setValue('registrantInfo.wardId', -1);
  }, [clearErrors, provinceId, provinceOptions, setValue]);

  useEffect(() => {
    if (districtId !== -1) {
      clearErrors('registrantInfo.districtId');
      setWardOptions((prevState) => {
        const district = districtOptions.find(({ id }) => id === districtId);
        if (district) {
          return district.children;
        } else {
          return [];
        }
      });
    }
    setInputWard('');
    setValue('registrantInfo.wardId', -1);
  }, [clearErrors, districtId, districtOptions, setValue]);

  useEffect(() => {
    if (wardId !== -1) {
      clearErrors('registrantInfo.wardId');
    }
  }, [clearErrors, wardId]);

  const onSubmit: SubmitHandler<IVaccineRegistration> = useCallback(
    (data) => {
      onChangePersonalInfo(data);
      onNextStep();
    },
    [onChangePersonalInfo, onNextStep]
  );

  const handleChangeProvinceId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IProvince | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('registrantInfo.provinceId', value ? value.id : -1);
      setFocus('registrantInfo.provinceId');
    },
    [setFocus, setValue]
  );

  const handleChangeDistrictId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IDistrict | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('registrantInfo.districtId', value ? value.id : -1);
      setFocus('registrantInfo.districtId');
    },
    [setFocus, setValue]
  );

  const handleChangeWardId = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: IWard | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('registrantInfo.wardId', value ? value.id : -1);
      setFocus('registrantInfo.wardId');
    },
    [setFocus, setValue]
  );

  const handleChangeNationality = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      value: ICountry | null,
      reason: AutocompleteChangeReason
    ) => {
      setValue('registrantInfo.nationality', value);
    },
    [setValue]
  );

  const handleChangeInputProvince = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: string) => {
      setInputProvince(value);
    },
    []
  );

  const handleChangeInputDistrict = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: string) => {
      setInputDistrict(value);
    },
    []
  );

  const handleChangeInputWard = useCallback(
    (event: React.SyntheticEvent<Element, Event>, value: string) => {
      setInputWard(value);
    },
    []
  );

  const getOptionLabelCountry = useCallback(
    (option: ICountry) => option.name,
    []
  );
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('????ng k?? m??i ti??m th???')}
          </Label>
          <Controller
            control={control}
            name="injectionTime"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('????ng k?? m??i ti??m th???')}
                sx={styleInputMedium}
                fullWidth
                select>
                <MenuItem value={0} disabled sx={{ display: 'none' }}>
                  {t('????ng k?? m??i ti??m th???')}
                </MenuItem>
                <MenuItem value={1}>{t('M??i th??? 1')}</MenuItem>
                <MenuItem value={2}>{t('M??i th??? 2')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="body1" my={2} fontWeight="500">
        1. {t('Th??ng tin ng?????i ????ng k?? ti??m')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('H??? v?? t??n')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.fullName"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('H??? v?? t??n')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Ng??y sinh')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.dob"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Ng??y sinh')}
                sx={styleInputMedium}
                type="date"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Gi???i t??nh')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.gender"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                defaultValue={-1}
                sx={styleInputMedium}
                fullWidth
                select>
                <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                  {t('Gi???i t??nh')}
                </MenuItem>
                <MenuItem value={1}>{t('Nam')}</MenuItem>
                <MenuItem value={0}>{t('N???')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('S??? ??i???n tho???i')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.phone"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('S??? ??i???n tho???i')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>Email</Label>
          <Controller
            control={control}
            name="registrantInfo.email"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder="Email"
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('S??? CMND/CCCD/M?? ?????nh danh c??ng d??n')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.citizenId"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('S??? CMND/CCCD/M?? ?????nh danh c??ng d??n')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('S??? th??? BHYT')}</Label>
          <Controller
            control={control}
            name="registrantInfo.healthInsuranceCardNumber"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('S??? th??? BHYT')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Ngh??? nghi???p')}</Label>
          <Controller
            control={control}
            name="registrantInfo.job"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Ngh??? nghi???p')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('????n v??? c??ng t??c')}</Label>
          <Controller
            control={control}
            name="registrantInfo.workUnit"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('????n v??? c??ng t??c')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('?????a ch??? hi???n t???i')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.healthInsuranceCardNumber"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('?????a ch??? hi???n t???i')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('T???nh/Th??nh ph???')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.provinceId"
            render={({ field, fieldState: { invalid, error } }) => {
              const valueAutocomplete = provinceOptions.find(
                ({ id }) => id === field.value
              );
              return (
                <Autocomplete
                  {...field}
                  value={valueAutocomplete}
                  onChange={handleChangeProvinceId}
                  onInputChange={handleChangeInputProvince}
                  options={provinceOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: inputProvince
                      }}
                      error={invalid}
                      helperText={t(error?.message || '')}
                      placeholder={t('T???nh/Th??nh ph???')}
                      sx={{
                        ...styleInputMedium,
                        '.MuiInputBase-root .MuiAutocomplete-input': {
                          py: '4.5px !important',
                          pl: '14px !important'
                        }
                      }}
                      fullWidth
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Qu???n/Huy???n')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.districtId"
            render={({ field, fieldState: { invalid, error } }) => {
              const valueAutocomplete = districtOptions.find(
                ({ id }) => id === field.value
              );
              return (
                <Autocomplete
                  {...field}
                  value={valueAutocomplete}
                  onChange={handleChangeDistrictId}
                  onInputChange={handleChangeInputDistrict}
                  options={districtOptions}
                  disabled={provinceId === -1}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: inputDistrict
                      }}
                      error={invalid}
                      helperText={t(error?.message || '')}
                      placeholder={t('Qu???n/Huy???n')}
                      sx={{
                        ...styleInputMedium,
                        '.MuiInputBase-root .MuiAutocomplete-input': {
                          py: '4.5px !important',
                          pl: '14px !important'
                        }
                      }}
                      fullWidth
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('X??/Ph?????ng')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.wardId"
            render={({ field, fieldState: { invalid, error } }) => {
              const valueAutocomplete = wardOptions.find(
                ({ id }) => id === field.value
              );
              return (
                <Autocomplete
                  {...field}
                  value={valueAutocomplete}
                  onChange={handleChangeWardId}
                  onInputChange={handleChangeInputWard}
                  options={wardOptions}
                  disabled={districtId === -1}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: inputWard
                      }}
                      error={invalid}
                      helperText={t(error?.message || '')}
                      placeholder={t('X??/Ph?????ng')}
                      sx={{
                        ...styleInputMedium,
                        '.MuiInputBase-root .MuiAutocomplete-input': {
                          py: '4.5px !important',
                          pl: '14px !important'
                        }
                      }}
                      fullWidth
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('D??n t???c')}</Label>
          <Controller
            control={control}
            name="registrantInfo.ethnic"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('D??n t???c')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Qu???c t???ch')}</Label>
          <Controller
            control={control}
            name="registrantInfo.nationality"
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={watch('registrantInfo.nationality')}
                onChange={handleChangeNationality}
                getOptionLabel={getOptionLabelCountry}
                options={countriesData}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('Qu???c t???ch')}
                    sx={{
                      ...styleInputMedium,
                      '.MuiInputBase-root .MuiAutocomplete-input': {
                        paddingTop: '4.5px !important',
                        paddingBottom: '4.5px !important',
                        pl: '14px !important'
                      }
                    }}
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Nh??m ??u ti??n')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.priorityGroup"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Nh??m ??u ti??n')}
                sx={styleInputMedium}
                defaultValue={-1}
                fullWidth
                select>
                <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                  {t('Nh??m ??u ti??n')}
                </MenuItem>
                <MenuItem value={1}>{t('Nh??m')} 1</MenuItem>
                <MenuItem value={2}>{t('Nh??m')} 2</MenuItem>
                <MenuItem value={3}>{t('Nh??m')} 3</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Typography variant="body1" my={2} fontWeight="500">
        2. {t('Th??ng tin ????ng k?? ti??m ch???ng')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('Ng??y mu???n ???????c ti??m')}
          </Label>
          <Controller
            control={control}
            name="vaccinationRegistrationInfo.injectionDate"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Ng??y mu???n ???????c ti??m')}
                sx={styleInputMedium}
                fullWidth
                type="date"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('Bu???i ti??m mong mu???n')}
          </Label>
          <Controller
            control={control}
            name="vaccinationRegistrationInfo.injectionTime"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Bu???i ti??m mong mu???n')}
                sx={styleInputMedium}
                fullWidth
                defaultValue={-1}
                select>
                <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                  {t('Bu???i ti??m mong mu???n')}
                </MenuItem>
                <MenuItem value={1}>{t('Bu???i s??ng')}</MenuItem>
                <MenuItem value={2}>{t('Bu???i chi???u')}</MenuItem>
                <MenuItem value={3}>{t('C??? ng??y')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      {injectionTime === 2 && (
        <>
          <Typography variant="body1" my={2} fontWeight="500">
            3. {t('L???ch s??? ti??m m??i th??? 1')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }} required>
                {t('T??n Vaccine')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.vaccineId"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    placeholder={t('T??n Vaccine')}
                    sx={styleInputMedium}
                    fullWidth
                    type="date"
                    select>
                    <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                      {t('T??n vaccine')}
                    </MenuItem>
                    {vaccineData.map(({ id, label }) => (
                      <MenuItem key={id} value={id}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }} required>
                {t('Ng??y ti??m')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.injectionDate"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    placeholder={t('Ng??y ti??m')}
                    sx={styleInputMedium}
                    fullWidth
                    type="date"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }}>{t('S??? l??')}</Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.shipmentNumber"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('S??? l??')}
                    sx={styleInputMedium}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }}>
                {t('?????a ??i???m ti??m')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.vaccinePlace"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('?????a ??i???m ti??m')}
                    sx={styleInputMedium}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Label sx={{ display: 'block', mb: 1 }}>
                {t('Ph???n ???ng sau ti??m ch???ng')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.postVaccinationReaction"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('Ph???n ???ng sau ti??m ch???ng')}
                    fullWidth
                    multiline
                    maxRows={5}
                  />
                )}
              />
            </Grid>
          </Grid>
        </>
      )}
      <Box mt={2} sx={{ color: colors.red[700] }}>
        <Typography variant="body1" fontWeight="bold">
          {t('L??u ??')}:
        </Typography>
        <Box component="ul">
          <Typography variant="body1" component="li">
            {t(
              'Vi???c ????ng k?? th??ng tin ho??n to??n b???o m???t v?? ph???c v??? cho chi???n d???ch ti??m ch???ng V???c xin COVID - 19'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'Xin vui l??ng ki???m tra k??? c??c th??ng tin b???t bu???c(VD: H??? v?? t??n, Ng??y th??ng n??m sinh, S??? ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh c??ng d??n/HC ...)'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'B???ng vi???c nh???n n??t "X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ?? ch???u tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'C?? nh??n/T??? ch???c ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a v??o danh s??ch ?????t ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi c?? v???c xin v?? k??? ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n!'
            )}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="center" mt={3}>
        <StyledButton
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}>
          {t('Ti???p t???c')}
        </StyledButton>
      </Stack>
    </Box>
  );
};

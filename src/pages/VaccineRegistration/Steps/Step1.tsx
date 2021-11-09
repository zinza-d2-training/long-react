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
            {t('Đăng ký mũi tiêm thứ')}
          </Label>
          <Controller
            control={control}
            name="injectionTime"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Đăng ký mũi tiêm thứ')}
                sx={styleInputMedium}
                fullWidth
                select>
                <MenuItem value={0} disabled sx={{ display: 'none' }}>
                  {t('Đăng ký mũi tiêm thứ')}
                </MenuItem>
                <MenuItem value={1}>{t('Mũi thứ 1')}</MenuItem>
                <MenuItem value={2}>{t('Mũi thứ 2')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="body1" my={2} fontWeight="500">
        1. {t('Thông tin người đăng ký tiêm')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Họ và tên')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.fullName"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Họ và tên')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Ngày sinh')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.dob"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Ngày sinh')}
                sx={styleInputMedium}
                type="date"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Giới tính')}
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
                  {t('Giới tính')}
                </MenuItem>
                <MenuItem value={1}>{t('Nam')}</MenuItem>
                <MenuItem value={0}>{t('Nữ')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Số điện thoại')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.phone"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Số điện thoại')}
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
            {t('Số CMND/CCCD/Mã định danh công dân')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.citizenId"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Số CMND/CCCD/Mã định danh công dân')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Số thẻ BHYT')}</Label>
          <Controller
            control={control}
            name="registrantInfo.healthInsuranceCardNumber"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Số thẻ BHYT')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Nghề nghiệp')}</Label>
          <Controller
            control={control}
            name="registrantInfo.job"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Nghề nghiệp')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Đơn vị công tác')}</Label>
          <Controller
            control={control}
            name="registrantInfo.workUnit"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Đơn vị công tác')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('Địa chỉ hiện tại')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.healthInsuranceCardNumber"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Địa chỉ hiện tại')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }} required>
            {t('Tỉnh/Thành phố')}
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
                      placeholder={t('Tỉnh/Thành phố')}
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
            {t('Quận/Huyện')}
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
                      placeholder={t('Quận/Huyện')}
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
            {t('Xã/Phường')}
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
                      placeholder={t('Xã/Phường')}
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
          <Label sx={{ display: 'block', mb: 1 }}>{t('Dân tộc')}</Label>
          <Controller
            control={control}
            name="registrantInfo.ethnic"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Dân tộc')}
                sx={styleInputMedium}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>{t('Quốc tịch')}</Label>
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
                    placeholder={t('Quốc tịch')}
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
            {t('Nhóm ưu tiên')}
          </Label>
          <Controller
            control={control}
            name="registrantInfo.priorityGroup"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={t(error?.message || '')}
                placeholder={t('Nhóm ưu tiên')}
                sx={styleInputMedium}
                defaultValue={-1}
                fullWidth
                select>
                <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                  {t('Nhóm ưu tiên')}
                </MenuItem>
                <MenuItem value={1}>{t('Nhóm')} 1</MenuItem>
                <MenuItem value={2}>{t('Nhóm')} 2</MenuItem>
                <MenuItem value={3}>{t('Nhóm')} 3</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Typography variant="body1" my={2} fontWeight="500">
        2. {t('Thông tin đăng ký tiêm chủng')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('Ngày muốn được tiêm')}
          </Label>
          <Controller
            control={control}
            name="vaccinationRegistrationInfo.injectionDate"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Ngày muốn được tiêm')}
                sx={styleInputMedium}
                fullWidth
                type="date"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Label sx={{ display: 'block', mb: 1 }}>
            {t('Buổi tiêm mong muốn')}
          </Label>
          <Controller
            control={control}
            name="vaccinationRegistrationInfo.injectionTime"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={t('Buổi tiêm mong muốn')}
                sx={styleInputMedium}
                fullWidth
                defaultValue={-1}
                select>
                <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                  {t('Buổi tiêm mong muốn')}
                </MenuItem>
                <MenuItem value={1}>{t('Buổi sáng')}</MenuItem>
                <MenuItem value={2}>{t('Buổi chiều')}</MenuItem>
                <MenuItem value={3}>{t('Cả ngày')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      {injectionTime === 2 && (
        <>
          <Typography variant="body1" my={2} fontWeight="500">
            3. {t('Lịch sử tiêm mũi thứ 1')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }} required>
                {t('Tên Vaccine')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.vaccineId"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    placeholder={t('Tên Vaccine')}
                    sx={styleInputMedium}
                    fullWidth
                    type="date"
                    select>
                    <MenuItem value={-1} disabled sx={{ display: 'none' }}>
                      {t('Tên vaccine')}
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
                {t('Ngày tiêm')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.injectionDate"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    placeholder={t('Ngày tiêm')}
                    sx={styleInputMedium}
                    fullWidth
                    type="date"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }}>{t('Số lô')}</Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.shipmentNumber"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('Số lô')}
                    sx={styleInputMedium}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Label sx={{ display: 'block', mb: 1 }}>
                {t('Địa điểm tiêm')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.vaccinePlace"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('Địa điểm tiêm')}
                    sx={styleInputMedium}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Label sx={{ display: 'block', mb: 1 }}>
                {t('Phản ứng sau tiêm chủng')}
              </Label>
              <Controller
                control={control}
                name="historyOfFirstInjection.postVaccinationReaction"
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder={t('Phản ứng sau tiêm chủng')}
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
          {t('Lưu ý')}:
        </Typography>
        <Box component="ul">
          <Typography variant="body1" component="li">
            {t(
              'Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp'
            )}
          </Typography>
          <Typography variant="body1" component="li">
            {' '}
            {t(
              'Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!'
            )}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="center" mt={3}>
        <StyledButton
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </Box>
  );
};

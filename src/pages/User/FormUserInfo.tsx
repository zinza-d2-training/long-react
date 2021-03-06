import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  ErrorMessage,
  FilePicker,
  Label,
  OtpDialog,
  StyledButton
} from 'components';
import * as _ from 'lodash';
import { IFile, IUserInfoForm } from 'models';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Controller,
  DefaultValues,
  FormProvider,
  Resolver,
  useForm
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styleInputMedium } from 'theme';
import { userFormSchema } from 'validations';
import { AddressInput } from './AddressInput';

interface IEditable {
  citizenId: boolean;
  phone: boolean;
  personalInfo: boolean;
  password: boolean;
}

interface IProps {
  userInfo: DefaultValues<IUserInfoForm>;
  onConfirm: (info: DefaultValues<IUserInfoForm>) => void;
}

export const FormUserInfo = (props: IProps) => {
  const { t } = useTranslation();

  const { userInfo, onConfirm } = props;
  const formMethod = useForm<IUserInfoForm>({
    defaultValues: userInfo,
    resolver: yupResolver(userFormSchema) as Resolver<IUserInfoForm>,
    mode: 'onChange'
  });
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    control,
    register,
    formState: { errors }
  } = formMethod;
  const formErrors = useMemo(() => errors, [errors]);

  const [editable, setEditable] = useState<IEditable>({
    citizenId: false,
    phone: false,
    personalInfo: false,
    password: false
  });
  const [openOtp, setOpenOtp] = useState(false);

  const handleOpenOtp = useCallback(() => {
    setOpenOtp(true);
  }, []);

  const handleCloseOtp = useCallback(() => {
    setOpenOtp(false);
  }, []);

  const handleConfirmPhoneNumberBlock = useCallback(() => {
    setEditable({
      ...editable,
      phone: !editable.phone
    });
    onConfirm(watch());
  }, [editable, onConfirm, watch]);

  const handleConfirmOtp = useCallback(() => {
    handleConfirmPhoneNumberBlock();
    handleCloseOtp();
  }, [handleCloseOtp, handleConfirmPhoneNumberBlock]);

  const handleToggleCitizenIdEditable = useCallback(() => {
    if (editable.citizenId) {
      setValue('citizenId', userInfo.citizenId || '');
      setValue('citizenImages', userInfo.citizenImages || []);
      clearErrors('citizenId');
      clearErrors('citizenImages');
    }
    setEditable({
      ...editable,
      citizenId: !editable.citizenId
    });
  }, [
    clearErrors,
    editable,
    setValue,
    userInfo.citizenId,
    userInfo.citizenImages
  ]);

  const handleTogglePhoneNumberEditable = useCallback(() => {
    if (editable.phone) {
      setValue('phoneNumber', userInfo.phoneNumber || '');
      clearErrors('phoneNumber');
    }
    setEditable({
      ...editable,
      phone: !editable.phone
    });
  }, [clearErrors, editable, setValue, userInfo.phoneNumber]);

  const handleTogglePersonalInfoEditable = useCallback(() => {
    if (editable.personalInfo) {
      setValue('fullName', userInfo.fullName || '');
      clearErrors('fullName');
      setValue('dob', userInfo.dob || '');
      clearErrors('dob');
      setValue('gender', Number(userInfo.gender));
      clearErrors('gender');
      setValue('provinceId', Number(userInfo.provinceId));
      clearErrors('provinceId');
      setValue('districtId', Number(userInfo.districtId));
      clearErrors('districtId');
      setValue('wardId', Number(userInfo.wardId));
      clearErrors('wardId');
    }
    setEditable({
      ...editable,
      personalInfo: !editable.personalInfo
    });
  }, [
    clearErrors,
    editable,
    setValue,
    userInfo.districtId,
    userInfo.dob,
    userInfo.fullName,
    userInfo.gender,
    userInfo.provinceId,
    userInfo.wardId
  ]);

  const handleTogglePasswordEditable = useCallback(() => {
    if (editable.password) {
      setValue('newPassword', '');
      clearErrors('newPassword');
      setValue('confirmPassword', '');
      clearErrors('confirmPassword');
    }
    setEditable({
      ...editable,
      password: !editable.password
    });
  }, [clearErrors, editable, setValue]);

  const handleConfirmCitizenIdBlock = useCallback(() => {
    setEditable({
      ...editable,
      citizenId: !editable.citizenId
    });
    onConfirm(watch());
  }, [editable, onConfirm, watch]);

  const handleAddImage = useCallback(
    (files: IFile[]) => {
      setValue('citizenImages', files);
      if (files.length < 2) {
        setError('citizenImages', { message: 'Ch???n t???i thi???u 2 ???nh' });
      } else {
        clearErrors('citizenImages');
      }
    },
    [clearErrors, setError, setValue]
  );

  const handleConfirmPersonalInfoBlock = useCallback(() => {
    setEditable({
      ...editable,
      personalInfo: !editable.personalInfo
    });
    onConfirm(watch());
  }, [editable, onConfirm, watch]);

  const handleConfirmPasswordBlock = useCallback(() => {
    setEditable({
      ...editable,
      password: !editable.password
    });
  }, [editable]);

  const handleRemoveImage = useCallback(
    (imageIndex: number) => {
      const newImages = _.cloneDeep(watch().citizenImages);
      newImages.splice(imageIndex, 1);

      setValue('citizenImages', newImages);
      if (newImages.length < 2) {
        setError('citizenImages', { message: 'Ch???n t???i thi???u 2 ???nh' });
      } else {
        clearErrors('citizenImages');
      }
    },
    [watch, setValue, setError, clearErrors]
  );

  return (
    <FormProvider {...formMethod}>
      <Box component="form">
        <Box
          sx={{
            '&:hover': { '.edit-button': { opacity: 1, visibility: 'visible' } }
          }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" fontWeight="500">
              {t('M?? s??? ?????nh danh')}
            </Typography>
            <IconButton
              onClick={handleToggleCitizenIdEditable}
              className="edit-button"
              sx={{ opacity: 0, visibility: 'hidden' }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box mt={2} px={2}>
            <Box>
              <Label sx={{ display: 'block' }}>
                {t('S??? CMND/CCCD/M?? ?????nh danh')}
              </Label>
              <Controller
                control={control}
                name="citizenId"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    sx={{ ...styleInputMedium, width: '322px' }}
                    disabled={!editable.citizenId}
                  />
                )}
              />
            </Box>
            <Box mt={2}>
              <Box display={editable.citizenId ? 'block' : 'none'}>
                <FilePicker
                  defaultValue={watch().citizenImages}
                  max={2}
                  inputProps={{ ...register('imageName'), multiple: true }}
                  onRemoveImage={handleRemoveImage}
                  onAddImage={handleAddImage}
                  editable={editable.citizenId}
                  width="344px"
                />
              </Box>
              {errors.citizenImages && (
                <ErrorMessage>{errors.citizenImages.message}</ErrorMessage>
              )}
            </Box>
            {editable.citizenId && (
              <Stack direction="row" mt={2} spacing={2}>
                <StyledButton
                  variant="outlined"
                  onClick={handleToggleCitizenIdEditable}>
                  {t('H???y b???')}
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleConfirmCitizenIdBlock}
                  disabled={
                    !!formErrors.citizenId || !!formErrors.citizenImages
                  }>
                  {t('L??u')}
                </StyledButton>
              </Stack>
            )}
          </Box>
        </Box>
        <Box
          mt={3}
          sx={{
            '&:hover': { '.edit-button': { opacity: 1, visibility: 'visible' } }
          }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" fontWeight="500">
              {t('S??? ??i???n tho???i')}
            </Typography>
            <IconButton
              onClick={handleTogglePhoneNumberEditable}
              className="edit-button"
              sx={{ opacity: 0, visibility: 'hidden' }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box mt={2} px={2}>
            <Box>
              <Label sx={{ display: 'block' }}>{t('S??? ??i???n tho???i')}</Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={t(error?.message || '')}
                    sx={{ ...styleInputMedium, width: '322px' }}
                    disabled={!editable.phone}
                  />
                )}
              />
            </Box>
            {editable.phone && (
              <Stack direction="row" mt={2} spacing={2}>
                <StyledButton
                  variant="outlined"
                  onClick={handleTogglePhoneNumberEditable}>
                  {t('H???y b???')}
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleOpenOtp}
                  disabled={!!formErrors.phoneNumber}>
                  {t('L??u')}
                </StyledButton>
              </Stack>
            )}
          </Box>
        </Box>
        <Box
          mt={3}
          sx={{
            '&:hover': { '.edit-button': { opacity: 1, visibility: 'visible' } }
          }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" fontWeight="500">
              {t('Th??ng tin c?? nh??n')}
            </Typography>
            <IconButton
              onClick={handleTogglePersonalInfoEditable}
              className="edit-button"
              sx={{ opacity: 0, visibility: 'hidden' }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box px={2}>
            <Stack direction="row" spacing={2}>
              <Box>
                <Label sx={{ display: 'block' }}>{t('H??? v?? t??n')}</Label>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      {...field}
                      error={invalid}
                      helperText={t(error?.message || '')}
                      sx={{ ...styleInputMedium, width: '322px' }}
                      disabled={!editable.personalInfo}
                    />
                  )}
                />
              </Box>
              <Box>
                <Label sx={{ display: 'block' }}>{t('Ng??y sinh')}</Label>
                <Controller
                  control={control}
                  name="dob"
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <TextField
                        {...field}
                        type="date"
                        error={invalid}
                        helperText={t(error?.message || '')}
                        sx={{ ...styleInputMedium, width: '322px' }}
                        disabled={!editable.personalInfo}
                      />
                    );
                  }}
                />
              </Box>
              <Box>
                <Label sx={{ display: 'block' }}>{t('Gi???i t??nh')}</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      {...field}
                      error={invalid}
                      helperText={t(error?.message || '')}
                      sx={{ ...styleInputMedium, width: '322px' }}
                      disabled={!editable.personalInfo}
                      select>
                      <MenuItem value={1}>{t('Nam')}</MenuItem>
                      <MenuItem value={0}>{t('N???')}</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            </Stack>
            <AddressInput editable={editable.personalInfo} />
          </Box>
          {editable.personalInfo && (
            <Stack direction="row" mt={2} spacing={2}>
              <StyledButton
                variant="outlined"
                onClick={handleTogglePersonalInfoEditable}>
                H???y b???
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleConfirmPersonalInfoBlock}
                disabled={
                  !!formErrors.fullName ||
                  !!formErrors.dob ||
                  !!formErrors.provinceId ||
                  !!formErrors.districtId ||
                  !!formErrors.wardId
                }>
                L??u
              </StyledButton>
            </Stack>
          )}
        </Box>
        <Box
          mt={3}
          sx={{
            '&:hover': { '.edit-button': { opacity: 1, visibility: 'visible' } }
          }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" fontWeight="500">
              {t('M???t kh???u')}
            </Typography>
            <IconButton
              onClick={handleTogglePasswordEditable}
              className="edit-button"
              sx={{ opacity: 0, visibility: 'hidden' }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box px={2}>
            <Label sx={{ display: 'block' }}>{t('M???t kh???u m???i')}</Label>
            <Controller
              control={control}
              name="newPassword"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  placeholder={t('M???t kh???u m???i')}
                  disabled={!editable.password}
                  error={invalid}
                  helperText={t(error?.message || '')}
                  sx={{ ...styleInputMedium, width: '322px' }}
                  type="password"
                />
              )}
            />
          </Box>
          <Box mt={2} px={2}>
            <Label sx={{ display: 'block' }}>{t('Nh???p l???i m???t kh???u')}</Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  placeholder={t('Nh???p l???i m???t kh???u')}
                  disabled={!editable.password}
                  error={invalid}
                  helperText={t(error?.message || '')}
                  sx={{ ...styleInputMedium, width: '322px' }}
                  type="password"
                />
              )}
            />
          </Box>
          {editable.password && (
            <Stack direction="row" mt={2} spacing={2}>
              <StyledButton
                variant="outlined"
                onClick={handleTogglePasswordEditable}>
                {t('H???y b???')}
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleConfirmPasswordBlock}
                disabled={!!errors.newPassword || !!errors.confirmPassword}>
                {t('L??u')}
              </StyledButton>
            </Stack>
          )}
        </Box>
      </Box>
      <OtpDialog
        open={openOtp}
        onClose={handleCloseOtp}
        onConfirm={handleConfirmOtp}
      />
    </FormProvider>
  );
};

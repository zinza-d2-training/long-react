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
import { ErrorMessage, FilePicker, Label, StyledButton } from 'components';
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

  const handleConfirmPhoneNumberBlock = useCallback(() => {
    setEditable({
      ...editable,
      phone: !editable.phone
    });
    onConfirm(watch());
  }, [editable, onConfirm, watch]);

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
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
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
        setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
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
              Mã số định danh
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
              <Label sx={{ display: 'block' }}>Số CMND/CCCD/Mã định danh</Label>
              <Controller
                control={control}
                name="citizenId"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
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
                  Hủy bỏ
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleConfirmCitizenIdBlock}
                  disabled={
                    !!formErrors.citizenId || !!formErrors.citizenImages
                  }>
                  Lưu
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
              Số điện thoại
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
              <Label sx={{ display: 'block' }}>Số điện thoại</Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    error={invalid}
                    helperText={error?.message}
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
                  Hủy bỏ
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={handleConfirmPhoneNumberBlock}
                  disabled={!!formErrors.phoneNumber}>
                  Lưu
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
              Thông tin cá nhân
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
                <Label sx={{ display: 'block' }}>Họ và tên</Label>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      {...field}
                      error={invalid}
                      helperText={error?.message}
                      sx={{ ...styleInputMedium, width: '322px' }}
                      disabled={!editable.personalInfo}
                    />
                  )}
                />
              </Box>
              <Box>
                <Label sx={{ display: 'block' }}>Ngày sinh</Label>
                <Controller
                  control={control}
                  name="dob"
                  render={({ field, fieldState: { invalid, error } }) => {
                    return (
                      <TextField
                        {...field}
                        type="date"
                        error={invalid}
                        helperText={error?.message}
                        sx={{ ...styleInputMedium, width: '322px' }}
                        disabled={!editable.personalInfo}
                      />
                    );
                  }}
                />
              </Box>
              <Box>
                <Label sx={{ display: 'block' }}>Giới tính</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      {...field}
                      error={invalid}
                      helperText={error?.message}
                      sx={{ ...styleInputMedium, width: '322px' }}
                      disabled={!editable.personalInfo}
                      select>
                      <MenuItem value={1}>Nam</MenuItem>
                      <MenuItem value={0}>Nữ</MenuItem>
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
                Hủy bỏ
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
                Lưu
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
              Mật khẩu
            </Typography>
            <IconButton
              onClick={handleTogglePasswordEditable}
              className="edit-button"
              sx={{ opacity: 0, visibility: 'hidden' }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Box px={2}>
            <Label sx={{ display: 'block' }}>Mật khẩu mới</Label>
            <Controller
              control={control}
              name="newPassword"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  placeholder="Mật khẩu mới"
                  disabled={!editable.password}
                  error={invalid}
                  helperText={error?.message}
                  sx={{ ...styleInputMedium, width: '322px' }}
                  type="password"
                />
              )}
            />
          </Box>
          <Box mt={2} px={2}>
            <Label sx={{ display: 'block' }}>Nhập lại mật khẩu</Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  {...field}
                  placeholder="Nhập lại mật khẩu"
                  disabled={!editable.password}
                  error={invalid}
                  helperText={error?.message}
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
                Hủy bỏ
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleConfirmPasswordBlock}
                disabled={!!errors.newPassword || !!errors.confirmPassword}>
                Lưu
              </StyledButton>
            </Stack>
          )}
        </Box>
      </Box>
    </FormProvider>
  );
};

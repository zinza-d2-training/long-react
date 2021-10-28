import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import ErrorMessage from 'components/ErrorMessage';
import FileInput from 'components/FileInput';
import { IRegisterForm } from 'models/register';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from 'validations';

const steps = ['Số CMND/CCCD', 'Thông tin cá nhân', 'Địa chỉ'];

const defaultValues: IRegisterForm = {
  citizenId: '',
  imageName: '',
  citizenImages: [],
  cityProvince: '',
  district: '',
  dob: null,
  fullName: '',
  gender: '',
  phoneNumber: '',
  wards: ''
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    blob: string;
  } | null>(null);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const {
    register,
    control,
    getValues,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
    defaultValues
  });

  useEffect(() => {
    return () => {
      getValues().citizenImages.map(({ preview }) =>
        URL.revokeObjectURL(preview)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = getValues().citizenImages;
    // @ts-ignore
    const file = e.target.files[0];
    setValue('citizenImages', [
      ...currentImages,
      { file, preview: URL.createObjectURL(file) }
    ]);
    if (currentImages.length < 1) {
      setError('citizenImages', { message: 'Chọn tối thiểu 2 ảnh' });
    } else {
      clearErrors('citizenImages');
    }
    e.target.value = '';
  };

  const handleChangeSelectedImage = (name: string, blob: string) => {
    setIsOpenPreview(true);
    setSelectedImage({ name, blob });
  };

  const handleRemoveImage = (imageIndex: number) => {
    const currentImages = getValues().citizenImages;
    const newImages = [...currentImages];
    newImages.splice(imageIndex, 1);
    URL.revokeObjectURL(currentImages[imageIndex].preview);
    setValue('citizenImages', newImages);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
      <Box
        sx={{
          background: 'url("images/login_background.png") no-repeat',
          backgroundSize: 'cover',
          flex: 1
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '420px',
            maxWidth: '100%'
          }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Đăng ký tài khoản
          </Typography>
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{ width: '100%' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box component="form" width="100%" mt={2}>
            <Box
              sx={{
                display: currentStep === 0 ? ' flex' : 'none',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Box>
                <Typography
                  component="label"
                  htmlFor="citizenId"
                  variant="label">
                  Số CMND/CCCD{' '}
                  <Box component="span" color={colors.red[700]}>
                    (*)
                  </Box>
                </Typography>
                <Controller
                  name="citizenId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      sx={{
                        height: '50px',
                        mt: 1,
                        '& > div': {
                          height: '100%'
                        }
                      }}
                      fullWidth
                      placeholder="Số CMND/CCCD"
                      {...field}
                      id="citizenId"
                    />
                  )}
                />
                {errors.citizenId?.message && (
                  <ErrorMessage>{errors.citizenId.message}</ErrorMessage>
                )}
                <Typography component="p" variant="label" mt={2}>
                  Ảnh chụp CMND/CCCD 2 mặt
                </Typography>
              </Box>
              <FileInput
                register={register}
                value={watch('citizenImages')}
                onChange={handleChangeImage}
                onChangeSelectedImages={handleChangeSelectedImage}
                onRemoveImages={handleRemoveImage}
              />
              {/* {errors.citizenImages && (
                <ErrorMessage>{errors.citizenImages?.message}</ErrorMessage>
              )} */}
            </Box>

            <Box sx={{ display: currentStep === 1 ? ' block' : 'none' }}>
              step2
            </Box>

            <Box sx={{ display: currentStep === 2 ? ' block' : 'none' }}>
              step3
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: !currentStep ? 'flex-end' : 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
            {!!currentStep && (
              <Button
                onClick={handleBackStep}
                startIcon={<ArrowBackIcon />}
                sx={{ color: (theme) => theme.palette.text.primary }}>
                Quay lại
              </Button>
            )}
            <Button
              disabled={!!Object.keys(errors).length}
              onClick={handleNextStep}
              endIcon={<ArrowForwardIcon />}>
              {currentStep === 2 ? 'Hoàn thành' : 'Tiếp tục'}
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={isOpenPreview}
        hideBackdrop
        sx={{ '& > div': { width: '490px', m: '0 auto' } }}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography
            component="p"
            variant="h6"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedImage?.name}
          </Typography>
          <IconButton onClick={() => setIsOpenPreview(false)}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage?.blob}
            width="100%"
            alt={selectedImage?.name}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Register;

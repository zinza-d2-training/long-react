import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { IRegisterForm } from 'models/register';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema } from 'validations';
import { Step1, Step2, Step3 } from './Steps';

const steps = ['Số CMND/CCCD', 'Thông tin cá nhân', 'Địa chỉ'];

const defaultValues: IRegisterForm = {
  citizenId: '',
  imageName: '',
  citizenImages: [],
  cityProvince: '',
  district: '',
  dob: undefined,
  fullName: '',
  gender: 'Nam',
  phoneNumber: '',
  wards: ''
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
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

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log(data);
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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '580px',
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
          <Box width="420px" mt={2}>
            <Box
              sx={{
                display: currentStep === 0 ? ' flex' : 'none',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Step1
                control={control}
                errors={errors}
                register={register}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                onNextStep={handleNextStep}
              />
            </Box>

            <Box sx={{ display: currentStep === 1 ? ' block' : 'none' }}>
              <Step2
                control={control}
                errors={errors}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                watch={watch}
              />
            </Box>

            <Box sx={{ display: currentStep === 2 ? ' block' : 'none' }}>
              <Step3
                watch={watch}
                control={control}
                errors={errors}
                setValue={setValue}
                onBackStep={handleBackStep}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

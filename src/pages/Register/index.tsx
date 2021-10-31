import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import OtpDialog from 'components/OtpDialog';
import { useClock } from 'hooks';
import { IRegisterForm } from 'models/register';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { PATH_LOGIN } from 'routes';
import { isNumberOrNull } from 'utils/validate';
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

const START_TIME = { hours: 0, minutes: 0, seconds: 0 };

const Register = () => {
  const form = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues
  });
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, touchedFields }
  } = form;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [isShowReSendOtp, setIsShowReSendOtp] = useState<boolean>(false);
  const history = useHistory();
  const { time, setTime } = useClock(START_TIME);

  useEffect(() => {
    if (time === '00:00:00') {
      setIsShowReSendOtp(true);
    } else {
      setIsShowReSendOtp(false);
    }
  }, [time]);

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

  const handleOpenModal = () => {
    setIsOpenModal(true);
    setTime({ hours: 0, minutes: 2, seconds: 0 });
  };

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log(data);
    handleOpenModal();
  };

  const handleChangeOtp = (otp: string) => {
    if (isNumberOrNull(otp)) {
      setOtp(otp);
    }
  };

  const handleCloseModal = () => {
    setOtp('');
    setIsOpenModal(false);
  };

  const handleReSendOtp = () => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
  };

  const handleConfirm = () => {
    handleCloseModal();
    history.push(PATH_LOGIN);
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
          flex: 1
        }}>
        <FormProvider {...form}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '580px',
              maxWidth: '100%',
              mt: '100px',
              '@media(min-height: 920px)': {
                mt: '25vh'
              }
            }}>
            <Stack spacing={3} width="100%" alignItems="center">
              <Typography variant="h4" fontWeight="bold" align="center">
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
              <Box width="380px">
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
                    setError={setError}
                    clearErrors={clearErrors}
                    touchedFields={touchedFields}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </FormProvider>
        <OtpDialog
          open={isOpenModal}
          otp={otp}
          isShowReSendOtp={isShowReSendOtp}
          time={time}
          onReSendOtp={handleReSendOtp}
          onChangeOtp={handleChangeOtp}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </Box>
    </Box>
  );
};

export default Register;

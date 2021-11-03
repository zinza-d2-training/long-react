import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import OtpDialog from 'components/OtpDialog';
import { IRegisterForm } from 'models/register';
import { useEffect, useState } from 'react';
import {
  DefaultValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { useHistory } from 'react-router';
import { RoutePaths } from 'routes';
import { registerSchema } from 'validations';
import { Step1, Step2, Step3 } from './Steps';

const steps = ['Số CMND/CCCD', 'Thông tin cá nhân', 'Địa chỉ'];

const defaultValues: DefaultValues<IRegisterForm> = {
  citizenId: '',
  imageName: '',
  citizenImages: [],
  dob: undefined,
  fullName: '',
  gender: 1,
  phoneNumber: '',
  provinceId: -1,
  districtId: -1,
  wardId: -1
};

const Register = () => {
  const formMethod = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema) as Resolver<IRegisterForm>,
    mode: 'onChange',
    defaultValues
  });

  const { getValues, handleSubmit } = formMethod;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    return () => {
      getValues().citizenImages.map(({ preview }) =>
        URL.revokeObjectURL(preview)
      );
    };
  }, [getValues]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    handleCloseModal();
    history.push(RoutePaths.login);
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
        <FormProvider {...formMethod}>
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
            <Typography variant="h4" fontWeight="bold" mb={3}>
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
            <Box width="380px" mt={3}>
              <Box
                sx={{
                  display: currentStep === 0 ? ' flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Step1 onNextStep={handleNextStep} />
              </Box>

              <Box sx={{ display: currentStep === 1 ? ' block' : 'none' }}>
                <Step2
                  onNextStep={handleNextStep}
                  onBackStep={handleBackStep}
                />
              </Box>

              <Box sx={{ display: currentStep === 2 ? ' block' : 'none' }}>
                <Step3 onBackStep={handleBackStep} />
              </Box>
            </Box>
          </Box>
        </FormProvider>
        <OtpDialog
          open={isOpenModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </Box>
    </Box>
  );
};

export default Register;

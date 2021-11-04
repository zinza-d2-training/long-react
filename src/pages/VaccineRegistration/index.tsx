import { Container, Step, StepLabel, Stepper } from '@mui/material';
import { Box } from '@mui/system';
import PageTitle from 'components/PageTitle';
import { IMedicalHistory, IVaccineRegistration } from 'models';
import { Step1, Step2, Step3, Step4 } from 'pages/VaccineRegistration/Steps';
import { useState } from 'react';
import { AppLayout } from 'theme/layout';

const steps = [
  'Thông tin cá nhân',
  'Tiền sử bệnh',
  'Phiếu đồng ý tiêm',
  'Hoàn thành'
];

const VaccineRegistration = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [personalInfo, setPersonalInfo] = useState<IVaccineRegistration | null>(
    null
  );
  const [medicalHistoryReport, setMedicalHistoryReport] = useState<
    IMedicalHistory[]
  >([]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChangePersonalInfo = (info: IVaccineRegistration) => {
    setPersonalInfo(info);
  };

  const handleChangeMedicalHistory = (report: IMedicalHistory[]) => {
    setMedicalHistoryReport(report);
  };

  const handleConfirm = () => {};
  return (
    <AppLayout>
      <PageTitle>Đăng ký tiêm</PageTitle>
      <Container maxWidth="xl">
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={8}>
          <Box sx={{ display: currentStep === 0 ? 'block' : 'none' }}>
            <Step1
              onNextStep={handleNextStep}
              onChangePersonalInfo={handleChangePersonalInfo}
            />
          </Box>
          <Box sx={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <Step2
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
              onChangeMedicalHistory={handleChangeMedicalHistory}
            />
          </Box>
          <Box sx={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <Step3 onNextStep={handleNextStep} onBackStep={handleBackStep} />
          </Box>
          <Box sx={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <Step4
              onConfirm={handleConfirm}
              onBackStep={handleBackStep}
              personalInfo={personalInfo}
              medicalHistoryReport={medicalHistoryReport}
            />
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
};

export default VaccineRegistration;

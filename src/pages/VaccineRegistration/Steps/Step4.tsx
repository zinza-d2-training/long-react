import { Box } from '@mui/material';
import { IMedicalHistory, IVaccineRegistration } from 'models';

interface IProps {
  personalInfo: IVaccineRegistration | null;
  medicalHistoryReport: IMedicalHistory[];
  onConfirm: () => void;
  onBackStep: () => void;
}

const Step4 = (props: IProps) => {
  return <Box>Step4</Box>;
};

export default Step4;

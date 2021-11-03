import { Box } from '@mui/material';
import { IVaccineRegistration } from 'models';

interface IProps {
  personalInfo: IVaccineRegistration | null;
  onConfirm: () => void;
  onBackStep: () => void;
}

const Step4 = (props: IProps) => {
  return <Box>Step4</Box>;
};

export default Step4;

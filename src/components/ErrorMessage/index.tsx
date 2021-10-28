import { colors, Typography, TypographyProps } from '@mui/material';

const ErrorMessage = (props: TypographyProps) => {
  return <Typography {...props} variant="bodySmall" color={colors.red[700]} />;
};

export default ErrorMessage;

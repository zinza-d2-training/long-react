import { colors, Typography, TypographyProps } from '@mui/material';

interface IProps extends TypographyProps {}

const ErrorMessage = (props: IProps) => {
  return (
    <Typography
      {...props}
      sx={{ ...props.sx, height: '16px', display: 'block', mt: 1 }}
      variant="bodySmall"
      color={colors.red[700]}
    />
  );
};

export default ErrorMessage;

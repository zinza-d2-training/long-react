import { TypographyProps, Typography, Box, colors } from '@mui/material';
import { FC } from 'react';

interface IProps extends TypographyProps {
  required?: boolean;
  component?: React.ElementType<any>;
  htmlFor?: string;
}

export const Label: FC<IProps> = (props) => {
  const { required, ...typoProps } = props;
  return (
    <Typography component="label" variant="label" {...typoProps}>
      {props.children}{' '}
      {required && (
        <Box component="span" sx={{ color: colors.red[700] }}>
          (*)
        </Box>
      )}
    </Typography>
  );
};

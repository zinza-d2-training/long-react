import { Button, ButtonProps, colors, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

const StyledButton = (props: ButtonProps) => {
  const defaultStyle: SxProps<Theme> = {
    borderRadius: '8px 8px 8px 0',
    minWidth: '90px',
    color: colors.indigo[700]
  };

  if (props.variant === 'contained') {
    defaultStyle.backgroundColor = colors.indigo[700];
    defaultStyle.color = '#fff';
  } else if (props.variant === 'outlined') {
    defaultStyle.borderColor = colors.indigo[700];
    defaultStyle.color = colors.indigo[700];
  }

  return <Button {...props} sx={Object.assign(defaultStyle, props.sx || {})} />;
};

export default StyledButton;

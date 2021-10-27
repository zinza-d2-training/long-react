import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
const CustomButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      sx={Object.assign(props.sx || {}, {
        borderRadius: '8px 8px 8px 0',
        minWidth: '90px'
      })}>
      {props.children}
    </Button>
  );
};

export default CustomButton;

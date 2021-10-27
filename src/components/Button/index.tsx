import { Button, ButtonProps } from '@mui/material';
const StyledButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={Object.assign(props.sx || {}, {
        borderRadius: '8px 8px 8px 0',
        minWidth: '90px'
      })}
    />
  );
};

export default StyledButton;

import { DialogTitle, DialogTitleProps } from '@mui/material';

const StyledDialogTitle = (props: DialogTitleProps) => {
  return (
    <DialogTitle
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    />
  );
};

export default StyledDialogTitle;

import { DialogTitle, DialogTitleProps } from '@mui/material';

const StyledDialogTitle = (props: DialogTitleProps) => {
  return (
    <DialogTitle
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '12px 11px 12px 24px'
      }}
    />
  );
};

export default StyledDialogTitle;

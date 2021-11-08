import {
  DialogTitle,
  DialogTitleProps,
  IconButton,
  Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps extends DialogTitleProps {
  title: string;
  onClose: () => void;
}

export const StyledDialogTitle = (props: IProps) => {
  return (
    <DialogTitle
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '12px 11px 12px 24px'
      }}>
      <Typography
        mr={1}
        component="p"
        variant="h6"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {props.title}
      </Typography>
      <IconButton onClick={props.onClose}>
        <ClearIcon />
      </IconButton>
    </DialogTitle>
  );
};

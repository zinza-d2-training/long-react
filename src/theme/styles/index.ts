import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const styleInputLarge: SxProps<Theme> = {
  height: '50px',
  mt: 1,
  '& > div': {
    height: '100%'
  }
};

import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const styleInputLarge: SxProps<Theme> = {
  '.MuiInputBase-root': {
    height: '50px'
  },
  '.MuiFormHelperText-root': {
    marginLeft: 0,
    marginRight: 0
  },
  '.MuiInputBase-root .MuiAutocomplete-input': {
    paddingTop: '4.5px !important',
    paddingBottom: '4.5px !important'
  },
  mt: 1,
  '& > div': {
    height: '100%'
  }
};

export const styleInputMedium: SxProps<Theme> = {
  '.MuiInputBase-root': {
    height: '40px',
    p: 0
  },
  '.MuiFormHelperText-root': {
    marginLeft: 0,
    marginRight: 0
  },
  '.MuiInputBase-root .MuiAutocomplete-input': {
    paddingTop: '4.5px !important',
    paddingBottom: '4.5px !important'
  },
  '& > div': {
    height: '100%'
  }
};

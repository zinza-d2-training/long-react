import {
  Box,
  LinkProps,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  PopperProps,
  Stack,
  Typography
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CSSProperties } from 'react';

export interface AppSubMenuItem {
  title: string;
  description?: string;
  iconColor: {
    primary: CSSProperties['color'];
    secondary: CSSProperties['color'];
  };
  to: LinkProps<RouterLink>['to'];
}

interface AppSubMenuProps extends PopperProps {
  items: AppSubMenuItem[];
}

export const AppSubMenu = ({ children, items, ...props }: AppSubMenuProps) => {
  return (
    <Popper role={undefined} placement="bottom" disablePortal {...props}>
      <Paper
        sx={{
          py: 2,
          mt: 1,
          borderRadius: '12px',
          boxShadow: '0 10px 70px rgba(0, 0, 0, 0.15)'
        }}>
        <MenuList sx={{ py: 0 }} autoFocusItem={props.open}>
          {items.map((item, index) => (
            <Link
              key={`AppSubMenu:${index}`}
              component={RouterLink}
              underline="none"
              color="inherit"
              to={item.to}>
              <MenuItem
                sx={{
                  px: 5,
                  py: '12px',
                  width: '100%',
                  '&:hover': {
                    background: 'none',
                    '.AppHeader-menuIconContainer': {
                      backgroundColor: item.iconColor.secondary
                    },
                    '.AppHeader-menuDirectionIcon': {
                      opacity: 1,
                      transform: 'translateX(6px)'
                    }
                  }
                }}>
                <Stack
                  width={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Box
                      className="AppHeader-menuIconContainer"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        color: item.iconColor.primary,
                        backgroundColor: '#f8f8f8',
                        transition: 'background-color 200ms ease'
                      }}>
                      <PeopleAltIcon sx={{ fill: 'currentColor' }} />
                    </Box>
                    <Stack direction="column">
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="bodySmall">
                        {item.description}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box
                    sx={{
                      minWidth: '70px',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                    <ArrowForwardIcon
                      className="AppHeader-menuDirectionIcon"
                      sx={{
                        width: '0.875em',
                        height: '0.875em',
                        fill: item.iconColor.primary,
                        opacity: 0,
                        transition:
                          'transform 200ms ease-in, opacity 200ms ease-in, -webkit-transform 200ms ease-in'
                      }}
                    />
                  </Box>
                </Stack>
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Paper>
    </Popper>
  );
};

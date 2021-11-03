import { colors, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

const PageTitle: FC = (props) => {
  return (
    <Box
      mt={4}
      mb={5}
      height="64px"
      px={4}
      sx={{
        backgroundColor: colors.grey[100],
        display: 'flex',
        alignItems: 'center'
      }}>
      <Container maxWidth="xl">
        <Typography variant="h6">{props.children}</Typography>
      </Container>
    </Box>
  );
};

export default PageTitle;

import { Box, styled } from '@mui/system';
import { FC } from 'react';

const Layout: FC = (props) => {
  return <Container className="App">{props.children}</Container>;
};

const Container = styled(Box)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export default Layout;

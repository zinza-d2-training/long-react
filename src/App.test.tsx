import { render } from '@testing-library/react';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import App from './App';
import store from 'store/store';
import { persistor } from 'store';
import theme from 'theme';

test('renders home text', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
});

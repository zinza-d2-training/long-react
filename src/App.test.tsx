import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store';
import store from 'store/store';
import theme from 'theme';
import { i18n } from 'utils';
import App from './App';

test('renders home text', () => {
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>{/* <App /> */}</ThemeProvider>
        </PersistGate>
      </I18nextProvider>
    </Provider>
  );
});

import { combineReducers } from 'redux';
import authReducer from './authSlice';
import i18nReducer from './i18nSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  i18n: i18nReducer
});

export default rootReducer;

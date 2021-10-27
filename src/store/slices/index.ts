import { combineReducers } from 'redux';
import counterReducer from './counterSlice';
import authReducer from './authSlice';

export * from './counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer
});

export default rootReducer;

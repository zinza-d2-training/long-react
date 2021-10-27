import { combineReducers } from 'redux';
import counterReducer from './counterSlice';

export * from './counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;

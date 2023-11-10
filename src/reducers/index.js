import { combineReducers } from 'redux';
import authReducer from '../components/features/authSlice';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  auth: authReducer
});

export default rootReducer;
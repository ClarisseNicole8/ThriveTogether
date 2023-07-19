import { combineReducers } from 'redux';
import recipientReducer from './recipientReducer';

const rootReducer = combineReducers({
  recipient: recipientReducer,
});

export default rootReducer;

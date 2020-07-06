import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    customer: customerReducer,
    notification: notificationReducer
});

export default rootReducer;
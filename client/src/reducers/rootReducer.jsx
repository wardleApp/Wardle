import { combineReducers } from 'redux'; // This calls every child reducer and gathers their results into a single state object.
import { reducerLoginAttempt } from './reducerLoginAttempt.jsx';

export default combineReducers({
    reducerLoginAttempt
});

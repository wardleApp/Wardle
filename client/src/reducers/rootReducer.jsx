import { combineReducers } from 'redux'; // This calls every child reducer and gathers their results into a single state object.
import { reducerGetBalance } from './reducerGetBalance.jsx';
import { reducerGetUserInfo } from './reducerGetUserInfo.jsx';
import { reducerInitialStates } from './reducerInitialStates.jsx';
import { reducerLoadMoreFeed } from './reducerLoadMoreFeed.jsx';
import { reducerLogUserIn } from './reducerLogUserIn.jsx';
import { reducerLogUserOut } from './reducerLogUserOut.jsx';
import { reducerSetInitialFeed } from './reducerSetInitialFeed.jsx';

export default combineReducers({
    reducerGetBalance,
    reducerGetUserInfo,
    reducerLoadMoreFeed,
    reducerLogUserIn,
    reducerLogUserOut,
    reducerSetInitialFeed,
    reducerInitialStates
});

/* Description: This file will combine all our smaller reducing functions 
into one large reducing function that we pass into createStore.
*/
import { combineReducers } from 'redux';

import memeData from './memeReducer';
import { auth } from './loginReducer';

export default combineReducers({
    memeData,
    auth
});

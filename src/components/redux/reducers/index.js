import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    loadingReducer,
})

export default rootReducer
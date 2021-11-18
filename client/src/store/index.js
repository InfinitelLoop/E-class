import { combineReducers, createStore } from 'redux';
import toasterReducer from './toaster';
import authReducer from './auth';

let store = createStore(combineReducers({
    toaster: toasterReducer,
    auth: authReducer
}));

export default store;
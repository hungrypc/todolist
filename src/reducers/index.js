import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todoReducer from './todoReducer';
import tagsReducer from './tagReducer';

export default combineReducers({
    auth: authReducer,
    todo: todoReducer,
    tags: tagsReducer
});



  

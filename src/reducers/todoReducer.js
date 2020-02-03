import { FETCH_TODOS, CREATE_TODO, SELECT_DATE } from '../actions/types';
import moment from 'moment';

const INITIAL_STATE = {
    list: [],
    date: moment(new Date().setHours(0, 0, 0, 0))
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {...state, list: action.payload };
        case CREATE_TODO:
            return state;
        case SELECT_DATE:
            return {...state, date: action.payload };
        default:
            return state;
    }
};
import { FETCH_TODOS, ORGANIZE_TODO, CREATE_TODO, SELECT_DATE, CHANGE_STATUS, SELECT_TAG } from '../actions/types';
import moment from 'moment';

const INITIAL_STATE = {
    list: [],
    date: moment(new Date().setHours(0, 0, 0, 0)),
    org: {},
    tag: 'all'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return { ...state, list: action.payload };
        case ORGANIZE_TODO:
            return { ...state, org: action.payload };
        case CREATE_TODO:
            return state;
        case SELECT_DATE:
            return { ...state, date: action.payload };
        case CHANGE_STATUS:
            return state;
        case SELECT_TAG:
            return { ...state, tag: action.payload };
        default:
            return state;
    }
};
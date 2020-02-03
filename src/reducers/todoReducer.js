import { FETCH_TODOS, CREATE_TODO, SELECT_DATE } from '../actions/types';

const INITIAL_STATE = {
    list: {},
    date: new Date().setHours(0, 0, 0, 0)
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
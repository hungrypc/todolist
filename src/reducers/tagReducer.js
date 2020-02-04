import { SELECT_TAG, FETCH_TAGS, HANDLE_POPOVER } from '../actions/types';

const INITIAL_STATE = {
    selectedTag: 'all',
    tags: {},
    popover: {
        success: false,
        warning: false,
        error: false
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_TAG:
            return { ...state, selectedTag: action.payload };
        case FETCH_TAGS:
            return { ...state, tags: action.payload };
        case HANDLE_POPOVER:
            return { ...state, popover: {...state.popover, [action.popType]: action.payload } };
        default:
            return state;
    }
};
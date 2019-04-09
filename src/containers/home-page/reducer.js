import * as actions from './constants';

const initialState = {
    isLoading: false,
    error: null,
}

export const homePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.HOME_PAGE_LOADING:
            return {
                ...state,
                isLoading: true,
            }
            break;

        case actions.HOME_PAGE_LOADED:
            return {
                ...state,
                isLoading: false,
            }
            break;

        case actions.HOME_PAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
            break;

        default:
            return state;
    }
}
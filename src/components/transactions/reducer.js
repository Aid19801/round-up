import * as actions from './constants';

const initialState = {
    isLoading: false,
    error: null,
    transactions: {},
}

export const transactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.TRANSACTIONS_LOADING:
            return {
                ...state,
                isLoading: true,
            }
            break;

        case actions.TRANSACTIONS_LOADED:
            return {
                ...state,
                isLoading: false,
                transactions: action.transactions,
            }
            break;

        case actions.TRANSACTIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
            break;

        case actions.TRANSACTIONS_UPDATED:
            return {
                ...state,
                transactions: action.transactions,
            }
            break;

        default:
            return state;
    }
}
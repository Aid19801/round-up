import * as actions from './constants';

const initialState = {
    isLoading: false,
    error: null,
    accountBalance: 0,
    savingsGoal: 0,
}

export const savingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SAVINGS_GOAL_LOADING:
            return {
                ...state,
                isLoading: true,
            }
            break;

        case actions.SAVINGS_GOAL_LOADED:
            return {
                ...state,
                isLoading: false,
            }
            break;

        case actions.SAVINGS_GOAL_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                accountBalance: 0,
            }
            break;

        case actions.SAVINGS_GOAL_UPDATED:
            return {
                ...state,
                accountBalance: action.accountBalance,
            }
            break;

        case actions.SAVINGS_API_LOADING:
            return {
                ...state,
                isLoading: true,
            }
            break;

        case actions.SAVINGS_API_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountBalance: action.accountBalance,
            }
            break;

        case actions.SAVINGS_API_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
            break;

        case actions.CREATE_NEW_SAVINGS_GOAL:
            return {
                ...state,
                isLoading: true,
                savingsGoal: action.newSavingsGoal,
            }
            break;

        case actions.NEW_SAVINGS_GOAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
            break;

        case actions.NEW_SAVINGS_GOAL_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
            break;

        default:
            return state;
    }
}
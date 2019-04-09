import { combineReducers } from 'redux';
import { homePageReducer } from '../containers/home-page/reducer';
import { savingsReducer } from '../components/savings-goal/reducer';
import { transactionsReducer } from '../components/transactions/reducer';

const RootReducer = combineReducers({
    homePage: homePageReducer,
    savings: savingsReducer,
    transactions: transactionsReducer,
})

export default RootReducer;
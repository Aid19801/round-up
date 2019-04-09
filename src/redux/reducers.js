import { combineReducers } from 'redux';
import { homePageReducer } from '../containers/home-page/reducer';

const RootReducer = combineReducers({
    homePage: homePageReducer,
})

export default RootReducer;
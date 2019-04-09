import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './constants';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
// const PROXY = "https://cors-anywhere.herokuapp.com";
// const STARLING_API = 'https://api-sandbox.starlingbank.com';
const TRANSACTIONS_ENDPOINT = 'api/v1/transactions';
const BALANCE_ENDPOINT = 'api/v1/accounts/balance';
// export const CREATE_SAVINGS_GOAL = '/api/v2/account/{accountUid}/savings-goals';
// export const TRANSFER_MONEY_TO_SAVINGS_GOAL = '/api/v2/account/{accountUid}/savings-goals/{savingsGoalUid}
// /add-money/{transferUid}';


export function* watcherHomepageLoading() {
    yield takeLatest(actions.HOME_PAGE_LOADING, workerHomepageLoading);
}

export function* workerHomepageLoading() {
    // getTransactions & getAccountBalance (separate APIs)

    // 1. Transactions
    let transactions = {};
    let transactionsError;
    yield fetch(`${TRANSACTIONS_ENDPOINT}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`
          },
    })
    .then(res => {
        console.log('res is ', res.status);
        return res.json()
    })
    .then(json => {
        console.log('transactions back: ', json);
        transactions = json;
    })
    .catch(err => {
        console.log('api fetching error: ', err)
        transactions = {};
        transactionsError = err;
    });

    transactions ?
    yield put({ type: 'TRANSACTIONS_LOADED', transactions })
    :
    yield put({ type: 'TRANSACTIONS_FAILED', error: transactionsError })
    
    
    // 2. Balance
    let accountBalance = null;
    let accountBalanceError;
    yield put({ type: 'SAVINGS_GOAL_LOADING' });
    yield fetch(`${BALANCE_ENDPOINT}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer KafJaxWu4LdGvUU6xumaXdKepBElB7PDVWaLGdVBFWF25Tbm5i6PUC5v5k2hdt0W"
        },
    })
    .then(res => {
        console.log('res is ', res.status);
        return res.json()
    })
    .then(json => {
        console.log('accountBalance back: ', json);
        accountBalance = json;
    })
    .catch(err => {
        console.log('api fetching error: ', err)
        accountBalance = null;
        accountBalanceError = err;
    });

    accountBalance ? 
    yield put({ type: 'SAVINGS_GOAL_LOADED', accountBalance })
    :
    yield put({ type: 'SAVINGS_FAILED', error: accountBalanceError })


}

   // make call to /transactions API
   // make call to /balance API

   // then pass both to homepage via props
   // because homepage container is where
   // the two shall meet.

   // in Homepage container there will be methods
   // to work out roundups, add them to balance etc.
   // then the results of that passed down to <SavingsGoal />


//    Accept: application/json

// Authorization: Bearer {yourAccessTokenFromAbove}
// User-Agent: Your Name
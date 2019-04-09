import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const STARLING_API = 'https://api-sandbox.starlingbank.com';
const TRANSACTIONS_ENDPOINT = 'api/v1/transactions';
const BALANCE_ENDPOINT = 'api/v1/accounts/balance';
const CREATE_SAVINGS_GOAL_ENDPOINT = 'api/v2/account/10e5b0ce-256b-43f1-bd8e-3851db969259/savings-goals';

export function* watcherHomepageLoading() {
    yield takeLatest(actions.HOME_PAGE_LOADING, workerHomepageLoading);
}

export function* workerHomepageLoading() {
    // getTransactions & getAccountBalance (separate APIs)

    // 1. Transactions
    let transactions = {};
    let transactionsError;
    yield fetch(`/${TRANSACTIONS_ENDPOINT}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`
          },
    })
    .then(res => {
        // console.log('res is ', res.status);
        return res.json()
    })
    .then(json => {
        // console.log('transactions back: ', json);
        transactions = json;
    })
    .catch(err => {
        // console.log('api fetching error: ', err)
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
    yield put({ type: 'SAVINGS_API_LOADING' });
    yield fetch(`/${BALANCE_ENDPOINT}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_TOKEN}`
        },
    })
    .then(res => {
        // console.log('res is ', res.status);
        return res.json()
    })
    .then(json => {
        // console.log('accountBalance back: ', json);
        accountBalance = json;
    })
    .catch(err => {
        // console.log('api fetching error: ', err)
        accountBalance = null;
        accountBalanceError = err;
    });

    accountBalance ? 
    yield put({ type: 'SAVINGS_API_SUCCESS', accountBalance })
    :
    yield put({ type: 'SAVINGS_API_FAIL', error: accountBalanceError })


}

export function* watcherNewSavingsGoal() {
    yield takeLatest('CREATE_NEW_SAVINGS_GOAL', workerNewSavingsGoal);
}

export function* workerNewSavingsGoal({ newSavingsGoal }) {
        // console.log('savings goal through ', newSavingsGoal);
        // let hasUpdated = false;
        // yield fetch(`${STARLING_API}/api/v2/account/10e5b0ce-256b-43f1-bd8e-3851db969259/savings-goals`)
        //     .then(res => {
        //         console.log('response is ', res.status);
        //         if (res.status === 200 || res.status === 204) {
        //             hasUpdated = true;
        //         } else {
        //             console.log('faaaaaail');
        //             hasUpdated = false;
        //         }
        //     })

        // hasUpdated ? yield put({ type: 'NEW_SAVINGS_GOAL_SUCCESS' })
        // :
        // yield put ({ type: 'NEW_SAVINGS_GOAL_FAIL' })
        return;
}

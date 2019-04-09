import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './constants';

export function* watcherHomepageLoading() {
    yield takeLatest(actions.HOME_PAGE_LOADING, workerHomepageLoading);
}

export function* workerHomepageLoading() {
    // api here
}
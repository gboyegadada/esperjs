import { put, takeLatest } from 'redux-saga/effects'
import { OkayAction, CancelAction } from '../types/action';
import { OKAY, clearConfirm, CANCEL } from '../actions/commands';
import { store } from '..';
import { ConfirmState } from '../types/state';

function* okayAction(action: OkayAction) {
    const confirmState: ConfirmState|null = store.getState().confirm
    if (null === confirmState) return

    yield put(confirmState.action)
    yield put(clearConfirm())
}

function* cancelAction(action: CancelAction) {
    yield put(clearConfirm())
}

function* rootSaga() {
    yield takeLatest(OKAY, okayAction)
    yield takeLatest(CANCEL, cancelAction)
}

export default rootSaga
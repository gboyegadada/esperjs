import { put, takeLatest, delay } from 'redux-saga/effects'
import { OkayAction, CancelAction, ConfirmAction } from '../types/action';
import { OKAY, clearConfirm, CANCEL, CONFIRM } from '../actions/commands';
import { store } from '..';
import { ConfirmState, LogLevel } from '../types/state';
import { log } from '../actions/console';

function* okayAction(action: OkayAction) {
    const confirmState: ConfirmState|null = store.getState().confirm
    if (null === confirmState) return
    
    yield put(log('OK', LogLevel.Success))

    yield delay(600)

    yield put(confirmState.action)
    yield put(clearConfirm())
}

function* confirmAction(action: ConfirmAction) {
    yield put(log(action.payload.message, LogLevel.Warning))
}

function* cancelAction(action: CancelAction) {
    yield put(clearConfirm())
    yield put(log('Canceled...', LogLevel.Success))
}

function* rootSaga() {
    yield takeLatest(OKAY, okayAction)
    yield takeLatest(CONFIRM, confirmAction)
    yield takeLatest(CANCEL, cancelAction)
}

export default rootSaga
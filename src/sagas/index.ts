import { all } from 'redux-saga/effects'
import commandSagas from './command'
import confirmSagas from './confirm'

function* rootSaga() {
    yield all([
        commandSagas(),
        confirmSagas(),
    ])
}

export default rootSaga
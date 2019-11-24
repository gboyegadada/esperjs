import { all } from 'redux-saga/effects'
import commandSagas from './command'
import confirmSagas from './confirm'
import helpSagas from './help'

function* rootSaga() {
    yield all([
        commandSagas(),
        confirmSagas(),
        helpSagas(),
    ])
}

export default rootSaga
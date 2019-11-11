import { put, debounce } from 'redux-saga/effects'
import { ProcessCommandAction } from '../types/action';
import { lookup } from '../utils/speechRecognition';
import { receiveCommand } from '../actions/commands';

// worker Saga: will be fired on PROCESS_COMMAND actions
function* processCommand(action: ProcessCommandAction) {
    const command = lookup(action.result)
    if (null !== command) {
        yield put(receiveCommand(command))
        yield put({ type: command.action })
    } else {
        console.log('INVALID_COMMAND', action.result)
    }
}

function* rootSaga() {
    yield debounce(1000, "PROCESS_COMMAND", processCommand)
}

export default rootSaga
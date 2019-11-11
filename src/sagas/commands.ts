import { put, takeLatest } from 'redux-saga/effects'
import { ProcessCommandAction } from '../types/action';
import { lookup } from '../utils/speechRecognition';
import { receiveCommand } from '../actions/commands';
import { store } from '..';

// worker Saga: will be fired on PROCESS_COMMAND actions
function* processCommand(action: ProcessCommandAction) {
    const { commands } = store.getState()

    let lastCommand: string = ''
    let ago: number = 10000;
    if (undefined !== commands[commands.length-1]) {
        lastCommand = commands[commands.length-1].command
        ago = (new Date().getTime()) - commands[commands.length-1].timestamp
    }

    const command = lookup(action.result)
    if (command && (lastCommand !== command.command && ago > 1000)) {
        yield put(receiveCommand(command))
        yield put({ type: command.action })
    } else if (command && undefined !== command) {
        console.log('SKIP_COMMAND', command, ago)
    } else {
        console.log('INVALID_COMMAND', action.result)
    }
}

function* rootSaga() {
    yield takeLatest("PROCESS_COMMAND", processCommand)
}

export default rootSaga
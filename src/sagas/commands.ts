import { put, takeLatest, delay } from 'redux-saga/effects'
import { ProcessCommandAction, OkayAction, CancelAction, TogglePowerAction, TOGGLE_POWER } from '../types/action';
import { lookup } from '../utils/speechRecognition';
import { receiveCommand, ready, invalidCommand, OKAY, clearConfirm, CANCEL, confirm, okay, PROCESS_COMMAND, clearCommands } from '../actions/commands';
import { store } from '..';
import { ConfirmState } from '../types/state';
import speechRecognition from '../utils/speechRecognition'
import beep, { errorBeep } from '../utils/audioEfx';

// worker Saga: will be fired on PROCESS_COMMAND actions
function* processCommandAction(action: ProcessCommandAction) {
    const { commands } = store.getState()

    let lastCommand: string = ''
    let ago: number = 10000;
    if (undefined !== commands[commands.length-1]) {
        lastCommand = commands[commands.length-1].command
        ago = (new Date().getTime()) - commands[commands.length-1].timestamp
    }

    const command = lookup(action.result)
    if (command && (lastCommand !== command.command && ago > 600)) {
        yield put(receiveCommand(command))
        yield put({ type: command.action })

        beep()
    } else if (command && undefined !== command) {
        console.log('SKIP_COMMAND', command, ago)
    } else {
        yield put(invalidCommand(action.result))
        
        errorBeep()
    }

    yield delay(900)
    yield put(ready())
}

function* shudownAction(action: TogglePowerAction) {
    const { power } = store.getState()
    
    if (null === speechRecognition) return
    
    try {
        power.on 
            // ESPER is **ON** so start listening...
            ? speechRecognition.start()
            
            // ESPER is **OFF** so stop listening...
            : speechRecognition.stop()
    } catch (e) {
        console.debug('ERROR: It looks like speech recognition not supported here yet 😶.', e.message, speechRecognition)
    }
}

function* okayAction(action: OkayAction) {
    const confirmState: ConfirmState|null = store.getState().confirm
    if (null === confirmState) return

    yield put(confirmState.action)
    yield put(clearConfirm())
}

function* cancelAction(action: OkayAction|CancelAction) {
    yield put(clearConfirm())
}

function* rootSaga() {
    yield takeLatest(PROCESS_COMMAND, processCommandAction)
    yield takeLatest(TOGGLE_POWER, shudownAction)
    yield takeLatest(OKAY, okayAction)
    yield takeLatest(CANCEL, cancelAction)
}

export default rootSaga
import { put, takeLatest, delay } from 'redux-saga/effects'
import { ProcessCommandAction, TogglePowerAction, TOGGLE_POWER } from '../types/action';
import { lookup, startListen, stopListen } from '../utils/speechRecognition';
import { receiveCommand, ready, invalidCommand, PROCESS_COMMAND } from '../actions/commands';
import { store } from '..';
import beep, { errorBeep } from '../utils/audioEfx';

// worker Saga: will be fired on PROCESS_COMMAND actions
function* processCommandAction(action: ProcessCommandAction) {

    const command = lookup(action.result)
    if (command) {
        yield put(receiveCommand(command))
        yield put({ type: command.action })

        beep()
    } else if (command && undefined !== command) {
        console.log('SKIP_COMMAND', command)
    } else {
        yield put(invalidCommand(action.result))
        
        errorBeep()
    }

    yield delay(900)
    yield put(ready())
}

function* shudownAction(action: TogglePowerAction) {
    const { power } = store.getState()
    
    try {
        power.on 
            // ESPER is **ON** so start listening...
            ? startListen()
            
            // ESPER is **OFF** so stop listening...
            : stopListen()

        yield true
    } catch (e) {
        console.debug('It looks like speech recognition is not yet supported here 😶. ERROR: ', e.message)
    }
}

function* rootSaga() {
    yield takeLatest(PROCESS_COMMAND, processCommandAction)
    yield takeLatest(TOGGLE_POWER, shudownAction)
}

export default rootSaga
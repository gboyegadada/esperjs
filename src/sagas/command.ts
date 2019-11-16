import { put, takeLatest, delay } from 'redux-saga/effects'
import { ProcessCommandAction, TogglePowerAction, TOGGLE_POWER, ComBackAction } from '../types/action';
import { lookup, startListen, stopListen } from '../utils/speechRecognition';
import { receiveCommand, ready, invalidCommand, PROCESS_COMMAND, COM_STOP, COM_BACK } from '../actions/commands';
import { store } from '..';
import beep, { errorBeep } from '../utils/audioEfx';
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN } from '../actions/location';
import { COM_ZOOM_IN, COM_ZOOM_OUT } from '../actions/zoom';

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

function* backAction(action: ComBackAction) {
  const { commands } = store.getState()

  for (let i = commands.length-1; i > 0; i--) {
    if (/^COM_MOVE_|COM_ZOOM_/.test(commands[i].command)) {
      switch (commands[i].command) {
        case COM_MOVE_LEFT:
          yield put({ type: COM_MOVE_RIGHT })
          break
        case COM_MOVE_RIGHT:
          yield put({ type: COM_MOVE_LEFT })
          break
        case COM_MOVE_UP:
          yield put({ type: COM_MOVE_DOWN })
          break
        case COM_MOVE_DOWN:
          yield put({ type: COM_MOVE_UP })
          break
        case COM_ZOOM_IN:
          yield put({ type: COM_ZOOM_OUT })
          break
        case COM_ZOOM_OUT:
          yield put({ type: COM_ZOOM_IN })
          break
        default:
          yield put({ type: COM_STOP })
      }
      break
    }
  }

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
    yield takeLatest(COM_BACK, backAction)
    yield takeLatest(TOGGLE_POWER, shudownAction)
}

export default rootSaga
import { put, takeLatest } from 'redux-saga/effects'
import { TogglePowerAction, TOGGLE_POWER, ComBackAction } from '../types/action';
import { startListen, stopListen } from '../utils/speechRecognition';
import { COM_STOP, COM_BACK } from '../actions/commands';
import { store } from '..';
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN } from '../actions/location';
import { COM_ZOOM_IN, COM_ZOOM_OUT } from '../actions/zoom';
import { echo, clear } from '../actions/console';
import { LogLevel } from '../types/state';

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
        if (power.on && false && startListen()) {
          // ESPER is **ON** so start listening...
          yield put(echo('Say "shut down" and then say "okay" to confirm or "cancel" to abort...'))
        } 
        
        else if (!power.on) {
          // ESPER is **OFF** so stop listening...
          stopListen()
          yield put(clear())
        }

        else yield put(echo('It looks like speech recognition is not yet supported here 😶.', LogLevel.Error))
    } catch (e) {
        yield put(echo('It looks like speech recognition is not yet supported here 😶.', LogLevel.Error))

        console.error('ERROR: ', e.message)
    }
}


function* rootSaga() {
    yield takeLatest(COM_BACK, backAction)
    yield takeLatest(TOGGLE_POWER, shudownAction)
}

export default rootSaga
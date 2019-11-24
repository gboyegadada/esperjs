import { put, takeLatest, delay } from 'redux-saga/effects'
import { ComHelpAction } from '../types/action';
import { LogLevel } from '../types/state';
import { echo } from '../actions/console';
import { COM_HELP } from '../actions/commands';

function* helpAction(action: ComHelpAction) {
  const help =  'Commands \n' + 
                '----------------------------------------------------------- \n' + 
                'Upload: "upload" / "Open"\n' +
                'Eject: "eject" / "close".\n' + 
                'W/E: "track left" / "move left" / "track right" / "move right".\n' + 
                'N/S: "move up" / "move down".\n' + 
                'Zoom: "zoom in" / "pull in" / "zoom out" / "pull out".\n' + 
                'Shutdown: "shut down" / "exit" \n' + 
                'Confirm: "okay" / "cancel"'

  yield put(echo(help, LogLevel.Info))
}

function* rootSaga() {
  yield takeLatest(COM_HELP, helpAction)
}

export default rootSaga
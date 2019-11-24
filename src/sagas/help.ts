import { put, takeLatest, delay } from 'redux-saga/effects'
import { ComHelpAction } from '../types/action';
import { LogLevel } from '../types/state';
import { echo } from '../actions/console';
import { COM_HELP } from '../actions/commands';

function* helpAction(action: ComHelpAction) {
  const help =  '📂: To open an image, say "upload" and choose a high resolution JPEG / PNG photo.\n' +
                'W/E: To move left or right, say "track left" / "move left" / "track right" / "move right".\n' + 
                'N/S: To move up or down, say "move up" / "move down".\n' + 
                '🔍: To zoom, say "zoom in" / "pull in" / "zoom out" / "pull out".\n' + 
                '⏏: To eject or close, say "eject" / "close".\n' + 
                '❌: To shutdown, say "shut down" \n' +
                '✅: Say "okay" to confirm or "cancel" to abort...'

  yield put(echo(help, LogLevel.Info))
}

function* rootSaga() {
  yield takeLatest(COM_HELP, helpAction)
}

export default rootSaga
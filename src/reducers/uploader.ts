import { UploaderActionTypes } from '../types/action'
import { UploaderState, UploaderStatus } from '../types/state'
import { COM_UPLOADER_BROWSE, COM_UPLOADER_CAPTURE, COM_UPLOADER_READY, COM_UPLOADER_CLEAR } from '../actions/uploader'

const initialState: UploaderState = {
  status: UploaderStatus.Ready,
  file: null,
}

export default function uploader (state = initialState, action: UploaderActionTypes) {
    switch(action.type) {
        case COM_UPLOADER_BROWSE:
            return { ...state, status: UploaderStatus.Browse }
        case COM_UPLOADER_CAPTURE:
            return { file: action.file, status: UploaderStatus.Ready }
        case COM_UPLOADER_READY:
            return { ...state, status: UploaderStatus.Ready }
        case COM_UPLOADER_CLEAR:
            return { file: null, status: UploaderStatus.Ready }
        default:
            return state
    }
}
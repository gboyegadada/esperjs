import { command } from '../utils/speechRecognition'

export const PROCESS_COMMAND = 'PROCESS_COMMAND'
export const RECEIVE_COMMAND = 'RECEIVE_COMMAND'
export const COM_TRACK_LEFT = 'COM_TRACK_LEFT'
export const COM_TRACK_RIGHT = 'COM_TRACK_RIGHT'
export const COM_PAN_LEFT = 'COM_PAN_LEFT'
export const COM_PAN_RIGHT = 'COM_PAN_RIGHT'
export const COM_STOP = 'COM_STOP'
export const COM_ENHANCE = 'COM_ENHANCE'
export const COM_CENTER = 'COM_CENTER'

export function processCommand (result: SpeechRecognitionResult) {
    return {
        type: PROCESS_COMMAND,
        result,
    }
}

export function receiveCommand (command: command) {
    return {
        type: RECEIVE_COMMAND,
        command,
    }
}

export function stop () {
    return {
        type: COM_STOP,
    }
}
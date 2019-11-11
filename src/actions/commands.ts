import { command } from '../utils/speechRecognition'

export const PROCESS_COMMAND = 'PROCESS_COMMAND'
export const RECEIVE_COMMAND = 'RECEIVE_COMMAND'
export const INVALID_COMMAND = 'INVALID_COMMAND'
export const COM_MOVE_LEFT = 'COM_MOVE_LEFT'
export const COM_MOVE_RIGHT = 'COM_MOVE_RIGHT'
export const COM_MOVE_UP = 'COM_MOVE_UP'
export const COM_MOVE_DOWN = 'COM_MOVE_DOWN'
export const COM_ZOOM_IN = 'COM_ZOOM_IN'
export const COM_ZOOM_OUT = 'COM_ZOOM_OUT'
export const COM_STOP = 'COM_STOP'
export const COM_ENHANCE = 'COM_ENHANCE'
export const COM_CENTER = 'COM_CENTER'
export const COM_HELP = 'COM_HELP'

export function processCommand (result: SpeechRecognitionResult) {
    return {
        type: PROCESS_COMMAND,
        result,
    }
}

export function receiveCommand (command: command) {
    return {
        type: RECEIVE_COMMAND,
        command: {
            command: command.action,
            timestamp: (new Date()).getTime(),
        },
    }
}

export function invalidCommand (result: SpeechRecognitionResult) {
    return {
        type: INVALID_COMMAND,
        result,
    }
}

export function stop () {
    return {
        type: COM_STOP,
    }
}
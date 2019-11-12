import { command } from '../utils/speechRecognition'
import { AnyAction } from 'redux'
import { ConfirmState } from '../types/state'

export const PROCESS_COMMAND = 'PROCESS_COMMAND'
export const RECEIVE_COMMAND = 'RECEIVE_COMMAND'
export const INVALID_COMMAND = 'INVALID_COMMAND'
export const CLEAR_COMMANDS = 'CLEAR_COMMANDS'
export const READY = 'READY'
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
export const CONFIRM = 'CONFIRM'
export const CLEAR_CONFIRM = 'CLEAR_CONFIRM'
export const OKAY = 'OKAY'
export const CANCEL = 'CANCEL'


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

export function clearCommands () {
    return {
        type: CLEAR_COMMANDS,
    }
}

export function invalidCommand (result: SpeechRecognitionResult | null) {
    return {
        type: INVALID_COMMAND,
        result,
    }
}

export function ready () {
    return {
        type: READY,
    }
}

export function stop () {
    return {
        type: COM_STOP,
    }
}

export function confirm (payload: ConfirmState) {
    return {
        type: CONFIRM,
        payload,
    }
}

export function clearConfirm () {
    return {
        type: CLEAR_CONFIRM,
    }
}

export function okay () {
    return {
        type: OKAY,
    }
}

export function cancel () {
    return {
        type: CANCEL,
    }
}
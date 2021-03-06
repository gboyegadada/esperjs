import { command } from '../utils/speechRecognition'
import { ConfirmState } from '../types/state'

export const RECEIVE_COMMAND = 'RECEIVE_COMMAND'
export const INVALID_COMMAND = 'INVALID_COMMAND'
export const CLEAR_COMMANDS = 'CLEAR_COMMANDS'
export const READY = 'READY'
export const COM_STOP = 'COM_STOP'
export const COM_BACK = 'COM_BACK'
export const COM_ENHANCE = 'COM_ENHANCE'
export const COM_HELP = 'COM_HELP'
export const CONFIRM = 'CONFIRM'
export const CLEAR_CONFIRM = 'CLEAR_CONFIRM'
export const OKAY = 'OKAY'
export const CANCEL = 'CANCEL'

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

export function invalidCommand (result: string[] | null) {
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
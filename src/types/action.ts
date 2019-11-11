import { PROCESS_COMMAND, RECEIVE_COMMAND, COM_TRACK_LEFT, COM_TRACK_RIGHT, COM_STOP, COM_PAN_LEFT, COM_PAN_RIGHT } from "../actions/commands"

export const TOGGLE_POWER = 'TOGGLE_POWER'

export const START_LISTENING = 'START_LISTENING'
export const STOP_LISTENING = 'STOP_LISTENING'


export interface TogglePowerAction {
    type: typeof TOGGLE_POWER
}

export interface StartListeningAction {
    type: typeof START_LISTENING
}

export interface StopListeningAction {
    type: typeof STOP_LISTENING
}


export interface ProcessCommandAction {
    type: typeof PROCESS_COMMAND
    result: SpeechRecognitionResult
}

export interface ReceiveCommandAction {
    type: typeof RECEIVE_COMMAND
}

export interface ComTrackLeftAction {
    type: typeof COM_TRACK_LEFT
}

export interface ComTrackRightAction {
    type: typeof COM_TRACK_RIGHT
}

export interface ComPanLeftAction {
    type: typeof COM_PAN_LEFT
}

export interface ComPanRightAction {
    type: typeof COM_PAN_RIGHT
}

export interface ComStopAction {
    type: typeof COM_STOP
}

export type PowerActionTypes = TogglePowerAction
export type ListeningActionTypes = StartListeningAction | StopListeningAction
export type CommandActionTypes = ProcessCommandAction | ReceiveCommandAction | ComTrackLeftAction | ComTrackRightAction | ComPanLeftAction | ComPanRightAction | ComStopAction
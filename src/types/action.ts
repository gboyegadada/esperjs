import { 
    PROCESS_COMMAND, 
    RECEIVE_COMMAND, 
    COM_MOVE_LEFT, 
    COM_MOVE_RIGHT, 
    COM_STOP, 
    INVALID_COMMAND, 
    COM_HELP, 
    COM_ENHANCE, 
    COM_MOVE_UP, 
    COM_MOVE_DOWN, 
    COM_ZOOM_IN, 
    COM_ZOOM_OUT, 
    READY 
} from "../actions/commands"
import { CommandState } from "./state"

export const TOGGLE_POWER = 'TOGGLE_POWER'


export interface TogglePowerAction {
    type: typeof TOGGLE_POWER
}

export interface ProcessCommandAction {
    type: typeof PROCESS_COMMAND
    result: SpeechRecognitionResult
}

export interface ReceiveCommandAction {
    type: typeof RECEIVE_COMMAND
    command: CommandState
}

export interface InvalidCommandAction {
    type: typeof INVALID_COMMAND
    result: SpeechRecognitionResult
}

export interface ReadyAction {
    type: typeof READY
}

export interface ComMoveLeftAction {
    type: typeof COM_MOVE_LEFT
}

export interface ComMoveRightAction {
    type: typeof COM_MOVE_RIGHT
}

export interface ComMoveUpAction {
    type: typeof COM_MOVE_UP
}

export interface ComMoveDownAction {
    type: typeof COM_MOVE_DOWN
}

export interface ComZoomInAction {
    type: typeof COM_ZOOM_IN
}

export interface ComZoomOutAction {
    type: typeof COM_ZOOM_OUT
}

export interface ComStopAction {
    type: typeof COM_STOP
}

export interface ComHelpAction {
    type: typeof COM_HELP
}

export interface ComEnhanceAction {
    type: typeof COM_ENHANCE
}

export type PowerActionTypes = TogglePowerAction
export type CommandActionTypes = ProcessCommandAction | ReceiveCommandAction | InvalidCommandAction | ReadyAction | ComMoveLeftAction | ComMoveRightAction | ComMoveUpAction | ComMoveDownAction | ComZoomInAction | ComZoomOutAction | ComStopAction | ComHelpAction | ComEnhanceAction
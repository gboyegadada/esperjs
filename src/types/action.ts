import { 
    PROCESS_COMMAND, 
    RECEIVE_COMMAND, 
    COM_STOP, 
    INVALID_COMMAND, 
    COM_HELP, 
    COM_ENHANCE, 
    READY, 
    CONFIRM,
    OKAY,
    CANCEL,
    CLEAR_CONFIRM,
    CLEAR_COMMANDS,
} from "../actions/commands"

import { 
    COM_MOVE_LEFT, 
    COM_MOVE_RIGHT, 
    COM_MOVE_UP, 
    COM_MOVE_DOWN, 
    COM_CENTER,
    COM_NUDGE_LEFT,
    COM_NUDGE_RIGHT,
    COM_NUDGE_UP,
    COM_NUDGE_DOWN,
    SET_MOVE_INTERVAL
} from "../actions/location"

import { 
    COM_ZOOM_IN, 
    COM_ZOOM_OUT, 
    COM_NUDGE_IN,
    COM_NUDGE_OUT,
    SET_ZOOM_INTERVAL,
} from "../actions/zoom"

import { CommandState, ConfirmState } from "./state"

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
    result: SpeechRecognitionResult | null
}

export interface ClearCommandsAction {
    type: typeof CLEAR_COMMANDS
}

export interface ReadyAction {
    type: typeof READY
}

export interface ConfirmAction {
    type: typeof CONFIRM,
    payload: ConfirmState
}

export interface ClearConfirmAction {
    type: typeof CLEAR_CONFIRM,
}

export interface OkayAction {
    type: typeof OKAY
}

export interface CancelAction {
    type: typeof CANCEL
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

export interface ComNudgeLeftAction {
    type: typeof COM_NUDGE_LEFT
}

export interface ComNudgeRightAction {
    type: typeof COM_NUDGE_RIGHT
}

export interface ComNudgeUpAction {
    type: typeof COM_NUDGE_UP
}

export interface ComNudgeDownAction {
    type: typeof COM_NUDGE_DOWN
}

export interface ComCenterAction {
    type: typeof COM_CENTER
}

export interface SetMoveIntervalAction {
    type: typeof SET_MOVE_INTERVAL
    interval: NodeJS.Timeout | null
}

export interface ComZoomInAction {
    type: typeof COM_ZOOM_IN
}

export interface ComZoomOutAction {
    type: typeof COM_ZOOM_OUT
}

export interface ComNudgeInAction {
    type: typeof COM_NUDGE_IN
}

export interface ComNudgeOutAction {
    type: typeof COM_NUDGE_OUT
}

export interface SetZoomIntervalAction {
    type: typeof SET_ZOOM_INTERVAL
    interval: NodeJS.Timeout | null
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
export type ConfirmActions = ConfirmAction | ClearConfirmAction | OkayAction | CancelAction
export type CommandActionTypes = ProcessCommandAction | ReceiveCommandAction | InvalidCommandAction | ClearCommandsAction | ReadyAction | ComMoveLeftAction | ComMoveRightAction | ComMoveUpAction | ComMoveDownAction | ComZoomInAction | ComZoomOutAction | ComStopAction | ComHelpAction | ComEnhanceAction
export type LocationActionTypes = SetMoveIntervalAction | ComMoveLeftAction | ComMoveRightAction | ComMoveUpAction | ComMoveDownAction | ComNudgeLeftAction | ComNudgeRightAction | ComNudgeUpAction | ComNudgeDownAction | ComCenterAction | ComStopAction
export type ZoomActionTypes = SetZoomIntervalAction | ComZoomInAction | ComZoomOutAction | ComNudgeInAction | ComNudgeOutAction | ComEnhanceAction | ComStopAction
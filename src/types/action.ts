import { 
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
    COM_BACK,
} from "../actions/commands"

import { 
    COM_MOVE_LEFT, 
    COM_MOVE_RIGHT, 
    COM_MOVE_UP, 
    COM_MOVE_DOWN, 
    COM_CENTER,
} from "../actions/location"

import { 
    COM_ZOOM_IN, 
    COM_ZOOM_OUT, 
    SET_ZOOM_INTERVAL,
} from "../actions/zoom"

import {
    COM_NUDGE_LEFT,
    COM_NUDGE_RIGHT,
    COM_NUDGE_UP,
    COM_NUDGE_DOWN,
    SET_NUDGE_INTERVAL,
    COM_NUDGE_IN,
    COM_NUDGE_OUT,
} from "../actions/nudge"

import { CommandState, ConfirmState } from "./state"
import { COM_UPLOADER_BROWSE, COM_UPLOADER_CAPTURE, COM_UPLOADER_READY, COM_UPLOADER_CLEAR } from "../actions/uploader"

export const TOGGLE_POWER = 'TOGGLE_POWER'


export interface TogglePowerAction {
    type: typeof TOGGLE_POWER
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

export interface SetNudgeIntervalAction {
    type: typeof SET_NUDGE_INTERVAL
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

export interface ComBackAction {
    type: typeof COM_BACK
}

export interface ComHelpAction {
    type: typeof COM_HELP
}

export interface ComEnhanceAction {
    type: typeof COM_ENHANCE
}

export interface ComUploaderBrowseAction {
    type: typeof COM_UPLOADER_BROWSE
}

export interface ComUploaderCaptureAction {
    type: typeof COM_UPLOADER_CAPTURE
    file: String
}

export interface ComUploaderReadyAction {
    type: typeof COM_UPLOADER_READY
}

export interface ComUploaderClearAction {
    type: typeof COM_UPLOADER_CLEAR
}

export type NudgeType = typeof COM_NUDGE_LEFT | typeof COM_NUDGE_RIGHT | typeof COM_NUDGE_UP | typeof COM_NUDGE_DOWN | typeof COM_NUDGE_IN |  typeof COM_NUDGE_OUT

export type PowerActionTypes = TogglePowerAction
export type ConfirmActions = ConfirmAction | ClearConfirmAction | OkayAction | CancelAction
export type CommandActionTypes = ReceiveCommandAction | InvalidCommandAction | ClearCommandsAction | ReadyAction | ComMoveLeftAction | ComMoveRightAction | ComMoveUpAction | ComMoveDownAction | ComZoomInAction | ComZoomOutAction | ComStopAction | ComBackAction | ComHelpAction | ComEnhanceAction
export type LocationActionTypes = SetNudgeIntervalAction | ComMoveLeftAction | ComMoveRightAction | ComMoveUpAction | ComMoveDownAction | ComNudgeLeftAction | ComNudgeRightAction | ComNudgeUpAction | ComNudgeDownAction | ComCenterAction | ComStopAction
export type ZoomActionTypes = SetNudgeIntervalAction | SetZoomIntervalAction | ComZoomInAction | ComZoomOutAction | ComNudgeInAction | ComNudgeOutAction | ComEnhanceAction | ComStopAction
export type UploaderActionTypes = ComUploaderBrowseAction | ComUploaderCaptureAction | ComUploaderClearAction | ComUploaderReadyAction
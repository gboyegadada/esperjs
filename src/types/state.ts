import rootReducer from "../reducers";
import { AnyAction } from "redux";

export interface PowerState {
    on: boolean
}

export interface CommandState {
    command: string
    timestamp: number
}

export interface ConfirmState {
    message: string
    action: AnyAction
    status: ConfirmStatus
}

export enum ConfirmStatus {
    Okay,
    Cancel,
    Pending
}

export enum ReceivedState {
    Ready,
    Failed,
    Success
}

export interface LocationState {
    x: number
    y: number
    moving: MovingState
    intervalID: NodeJS.Timeout | null
}

export enum MovingState {
    Left,
    Right,
    Up,
    Down,
    Stop
}

export interface ZoomState {
    scale: number
    zooming: ZoomingState
}

export enum ZoomingState {
    In,
    Out,
    Stop
}

/**
 * Will return something like:
 * {
 *    power: PowerState
 *    commands: CommandState[]
 * }
 */
export type AppState = ReturnType<typeof rootReducer>
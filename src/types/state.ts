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

/**
 * Will return something like:
 * {
 *    power: PowerState
 *    commands: CommandState[]
 * }
 */
export type AppState = ReturnType<typeof rootReducer>
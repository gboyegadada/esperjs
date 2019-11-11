import rootReducer from "../reducers";

export interface PowerState {
    on: boolean
}

export interface CommandState {
    command: string
    timestamp: number
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
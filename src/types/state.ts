import rootReducer from "../reducers";

export interface PowerState {
    on: boolean
}

export type CommandsState = string[]

/**
 * Will return something like:
 * {
 *    power: PowerState
 *    commands: CommandsState
 * }
 */
export type AppState = ReturnType<typeof rootReducer>
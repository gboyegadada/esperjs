import rootReducer from "../reducers";

export interface PowerState {
    on: boolean
}

/**
 * Will return something like:
 * {
 *    power: PowerState
 * }
 */
export type AppState = ReturnType<typeof rootReducer>
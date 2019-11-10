import { TogglePowerAction, ActionTypes } from '../types/action'

export default function power (state = { on: false }, action: TogglePowerAction) {
    switch(action.type) {
        case ActionTypes.TOGGLE_POWER:
            return { on: !state.on }
        default:
            return state
    }
}
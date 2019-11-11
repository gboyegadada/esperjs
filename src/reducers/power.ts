import { TogglePowerAction, TOGGLE_POWER } from '../types/action'
import { PowerState } from '../types/state'

const initialState: PowerState = {
    on: false
}

export default function power (state = initialState, action: TogglePowerAction) {
    switch(action.type) {
        case TOGGLE_POWER:
            return { on: !state.on }
        default:
            return state
    }
}
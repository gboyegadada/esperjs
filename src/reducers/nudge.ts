import { LocationActionTypes } from '../types/action'
import { COM_NUDGE_LEFT, COM_NUDGE_RIGHT, COM_NUDGE_UP, COM_NUDGE_DOWN, SET_NUDGE_INTERVAL } from '../actions/nudge'
import { COM_STOP } from '../actions/commands'
import { NudgeState } from '../types/state'

const initialState: NudgeState = {
    count: 0,
    interval: null,
}

export default function nudge (state = initialState, action: LocationActionTypes) {
    switch(action.type) {
        // Nudge: left | right | up | down
        case COM_NUDGE_LEFT:
        case COM_NUDGE_RIGHT:
        case COM_NUDGE_UP:
        case COM_NUDGE_DOWN:
                return  { ...state, count: state.count + 1  }

        // Set nudge interval (for action that will be dispatched)
        case SET_NUDGE_INTERVAL:
                return { ...state, interval: action.interval }

        // Stop moving
        case COM_STOP:
            if (state.interval) clearInterval(state.interval)

            return { ...state, count: 0, interval: null }

        default:
            return state
    }
}
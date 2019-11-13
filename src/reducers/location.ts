import { LocationActionTypes } from '../types/action'
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN, COM_CENTER } from '../actions/location'
import { COM_NUDGE_LEFT, COM_NUDGE_RIGHT, COM_NUDGE_UP, COM_NUDGE_DOWN } from '../actions/nudge'
import { LocationState, MovingState } from '../types/state'

const initialState: LocationState = {
    x: 0,
    y: 0,
    moving: MovingState.Stop,
}

export default function location (state = initialState, action: LocationActionTypes) {
    switch(action.type) {
        // Start moving: left | right | up | down
        case COM_MOVE_LEFT:
            return { ...state, moving: MovingState.Left }
        case COM_MOVE_RIGHT:
            return { ...state, moving: MovingState.Right }
        case COM_MOVE_UP:
            return { ...state, moving: MovingState.Up }
        case COM_MOVE_DOWN:
            return { ...state, moving: MovingState.Down }

        // Nudge: left | right | up | down
        case COM_NUDGE_LEFT:
            return state.x === -100 ? state : { ...state, x: state.x - 1  }
        case COM_NUDGE_RIGHT:
            return state.x === 100 ? state : { ...state, x: state.x + 1  }
        case COM_NUDGE_UP:
            return state.y === -100 ? state : { ...state, y: state.y - 1  }
        case COM_NUDGE_DOWN:
            return state.y === 100 ? state : { ...state, y: state.y + 1  }

        // Center
        case COM_CENTER:
            return { ...state, x: 0, y: 0  }

        default:
            return state
    }
}
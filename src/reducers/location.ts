import { LocationActionTypes } from '../types/action'
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN, COM_CENTER } from '../actions/location'
import { COM_NUDGE_LEFT, COM_NUDGE_RIGHT, COM_NUDGE_UP, COM_NUDGE_DOWN } from '../actions/nudge'
import { LocationState, MovingState } from '../types/state'
import { COM_STOP } from '../actions/commands'

const initialState: LocationState = {
  x: 0,
  y: 0,
  moving: MovingState.Stop,
}

export default function location (state = initialState, action: LocationActionTypes) {
  const { moving: m, x, y } = state
  
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
      return m === MovingState.Stop ? state : state.x === -100 ? state : { ...state, x: state.x - 2  }
    case COM_NUDGE_RIGHT:
      return m === MovingState.Stop ? state : state.x === 100 ? state : { ...state, x: state.x + 2  }
    case COM_NUDGE_UP:
      return m === MovingState.Stop ? state : state.y === -100 ? state : { ...state, y: state.y - 2  }
    case COM_NUDGE_DOWN:
      return m === MovingState.Stop ? state : state.y === 100 ? state : { ...state, y: state.y + 2  }

    // Center
    case COM_CENTER:
      return { ...state, x: 0, y: 0  }

    // Stop moving
    case COM_STOP:
      return { 
        ...state, 
        moving: MovingState.Stop, 

        // If we were previously moving LEFT, nudge 1 step RIGHT to compensate 
        // for delay after saying "stop". Same for the other way around.
        x: (m === MovingState.Left && 0 !== x)
          ? x + 1 
          : (m === MovingState.Right && 0 !== x) ?  x - 1 : x + 0,
          
        // If we were previously moving UP, nudge 1 step DOWN to compensate 
        // for delay after saying "stop". Same for the other way around. 
        y: (m === MovingState.Up  && 0 !== y)
          ? y + 1 
          : (m === MovingState.Down && 0 !== y) ?  y - 1 : y + 0
      }

    default:
      return state
  }
}
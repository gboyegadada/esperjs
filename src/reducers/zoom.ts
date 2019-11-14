import { ZoomActionTypes } from '../types/action'
import { COM_NUDGE_IN, COM_NUDGE_OUT } from '../actions/nudge'
import { ZoomState, ZoomingState } from '../types/state'
import { COM_STOP } from '../actions/commands'
import { COM_ZOOM_IN, COM_ZOOM_OUT } from '../actions/zoom'

const STEP = 2
export const MAX_ZOOM = 200
export const MIN_ZOOM = 1

const initialState: ZoomState = {
  scale: 100,
  zooming: ZoomingState.Stop,
}

const r = (value: number, precision: number = 3) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default function location (state = initialState, action: ZoomActionTypes) {
  const { zooming: z, scale: s } = state

  switch(action.type) {
    // Start zooming: in | out
    case COM_ZOOM_IN:
      return { ...state, zooming: ZoomingState.In }
    case COM_ZOOM_OUT:
      return { ...state, zooming: ZoomingState.Out }

    // Nudge: in | out
    case COM_NUDGE_IN:
      return z === ZoomingState.Stop ? state : s === MAX_ZOOM ? state : { ...state, scale: r(s + STEP)  }
    case COM_NUDGE_OUT:
      return z === ZoomingState.Stop ? state : s <= MIN_ZOOM ? state : { ...state, scale: r(s - STEP)  }

    // Stop zooming
    case COM_STOP:
      return { 
        ...state, 
        zooming: ZoomingState.Stop, 

        // If we were previously zooming IN, nudge 1 step OUT to compensate 
        // for delay after saying "stop". Same for the other way around.
        // scale: (z === ZoomingState.In && s > MIN_ZOOM)
        //   ? s - STEP 
        //   : (z === ZoomingState.Out && s < MAX_ZOOM) ? r(s + STEP) : s + 0,
      }

    default:
      return state
  }
}
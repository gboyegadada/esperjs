import { AnyAction, Middleware, Dispatch, MiddlewareAPI } from "redux"
import { stop } from "../actions/commands"
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN } from "../actions/location"
import { COM_NUDGE_LEFT, COM_NUDGE_RIGHT, COM_NUDGE_UP, COM_NUDGE_DOWN, setNudgeInterval, COM_NUDGE_IN, COM_NUDGE_OUT } from "../actions/nudge"
import { COM_ZOOM_IN, COM_ZOOM_OUT } from "../actions/zoom"
import { NudgeType } from "../types/action"
import { log } from "../actions/console"

const INTERVAL_MS = 300

// Automatically stop nudges before a new COM_MOVE_* or COM_ZOOM_* action gets to the reducer.
const nudge: Middleware<Dispatch> = (store: MiddlewareAPI) => next => (action: AnyAction) => {

  if (/^(COM_MOVE_|COM_ZOOM_)/.test(action.type)) {

    const { uploader: { file } } = store.getState()
    if (!file) return

    // 1. Stop any active PANNING / ZOOMING 
    store.dispatch(stop())

    // 2. Set an interval that will dispatch NUDGE actions for the right MOVE / ZOOM action
    let NUDGE_ACTION_TYPE: NudgeType | null = null
    let MSG: string

    switch(action.type) {
      // Start moving: left | right | up | down
      case COM_MOVE_LEFT:
        NUDGE_ACTION_TYPE = COM_NUDGE_LEFT
        MSG = 'Tracking left...'
        break
      case COM_MOVE_RIGHT:
        NUDGE_ACTION_TYPE = COM_NUDGE_RIGHT
        MSG = 'Tracking right...'
        break
      case COM_MOVE_UP:
        NUDGE_ACTION_TYPE = COM_NUDGE_UP
        MSG = 'Pulling up...'
        break
      case COM_MOVE_DOWN:
        NUDGE_ACTION_TYPE = COM_NUDGE_DOWN
        MSG = 'Moving down...'
        break
      case COM_ZOOM_IN:
        NUDGE_ACTION_TYPE = COM_NUDGE_IN
        MSG = 'Pulling in...'
        break
      case COM_ZOOM_OUT:
        NUDGE_ACTION_TYPE = COM_NUDGE_OUT
        MSG = 'Pulling out...'
        break
    }
    
    if (NUDGE_ACTION_TYPE) {
      const intervalAction = setNudgeInterval(setInterval(() => {
        store.dispatch({ type: NUDGE_ACTION_TYPE })
      }, INTERVAL_MS))
      
      store.dispatch(intervalAction)
      store.dispatch(log(MSG))
    }
  }
  
  // Stop PANNING / ZOOMING after a few nudges...
  if (/^(COM_NUDGE_)/.test(action.type)) {

    const { nudge: { count } } = store.getState()

    if(count >= 10) return next(stop())
  }
  
  return next(action) 
}

export default nudge
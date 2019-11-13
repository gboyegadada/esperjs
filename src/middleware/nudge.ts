import { AnyAction, Middleware, Dispatch, MiddlewareAPI } from "redux"
import { stop } from "../actions/commands"
import { COM_MOVE_LEFT, COM_MOVE_RIGHT, COM_MOVE_UP, COM_MOVE_DOWN, COM_NUDGE_LEFT, COM_NUDGE_RIGHT, COM_NUDGE_UP, COM_NUDGE_DOWN, setMoveInterval } from "../actions/location"

const INTERVAL_MS = 500

// Automatically stop nudges before a new COM_MOVE_* or COM_ZOOM_* action gets to the reducer.
const nudge: Middleware<Dispatch> = (store: MiddlewareAPI) => next => (action: AnyAction) => {

    if (/^(COM_MOVE_|COM_ZOOM_)/.test(action.type)) {

        // 1. Stop any active PANNING / ZOOMING 
        store.dispatch(stop())

        // 2. Set an interval that will dispatch NUDGE actions for the right MOVE / ZOOM action
        let NUDGE_ACTION_TYPE: typeof COM_NUDGE_LEFT | typeof COM_NUDGE_RIGHT | typeof COM_NUDGE_UP | typeof COM_NUDGE_DOWN | null = null

        switch(action.type) {
            // Start moving: left | right | up | down
            case COM_MOVE_LEFT:
                NUDGE_ACTION_TYPE = COM_NUDGE_LEFT
                break
            case COM_MOVE_RIGHT:
                NUDGE_ACTION_TYPE = COM_NUDGE_RIGHT
                break
            case COM_MOVE_UP:
                NUDGE_ACTION_TYPE = COM_NUDGE_UP
                break
            case COM_MOVE_DOWN:
                NUDGE_ACTION_TYPE = COM_NUDGE_DOWN
                break
        }
        
        if (NUDGE_ACTION_TYPE) {
            const intervalAction = setMoveInterval(setInterval(() => {
                store.dispatch({ type: NUDGE_ACTION_TYPE })
            }, INTERVAL_MS))
            
            store.dispatch(intervalAction)
        }
    }
    
    // Stop PANNING / ZOOMING after a few nudges...
    if (/^(COM_NUDGE_)/.test(action.type)) {

        const { nudge: { count } } = store.getState()

        count >= 6 && store.dispatch(stop())
    }
    
    return next(action) 
}

export default nudge
import { AnyAction, Middleware, Dispatch, MiddlewareAPI } from "redux"
import { TOGGLE_POWER } from "../types/action"
import { ConfirmStatus } from "../types/state"
import { confirm as confirmAction } from "../actions/commands"

const confirm: Middleware<Dispatch> = (store: MiddlewareAPI) => next => (action: AnyAction) => {
    const { confirm: confirmState, power } = store.getState()

    if (action.type === TOGGLE_POWER && false === power.on) return next(action) 

    if (action.type === TOGGLE_POWER && confirmState === null)  {
        store.dispatch(confirmAction({
            message: 'ESPER will shutdown. Confirm?',
            action,
            status: ConfirmStatus.Pending
        }))
        return
    }

    if (action.type === TOGGLE_POWER && confirmState && confirmState.action.type === action.type && confirmState.status !== ConfirmStatus.Okay) {
        return
    }

    return next(action) 
}

export default confirm
import { MiddlewareAPI, Middleware, Dispatch } from 'redux'
import { TogglePowerAction } from '../types/action'

type ReduxActions = TogglePowerAction

const logger: Middleware<Dispatch> = (store: MiddlewareAPI) => next => (action: ReduxActions) => {
    console.group(action.type)
    console.log('The action: ', action)

    const res = next(action)
    console.log('The new state: ', store.getState())
    console.groupEnd()

    return res
}

export default logger
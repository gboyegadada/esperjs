import { ConfirmActions } from '../types/action'
import { CONFIRM, OKAY, CANCEL, CLEAR_CONFIRM } from '../actions/commands'
import { ConfirmState, ConfirmStatus } from '../types/state'

const initialState: ConfirmState | null = null

export default function confirm (state = initialState, action: ConfirmActions) {
    switch(action.type) {
        case CONFIRM:
            return { ...action.payload }
        case CLEAR_CONFIRM:
            return null
        case OKAY:
            return state ? { ...state, ...{ status: ConfirmStatus.Okay } } : state
        case CANCEL:
            return state ? { ...state, ...{ status: ConfirmStatus.Cancel } } : state
        default:
            return state
    }
}
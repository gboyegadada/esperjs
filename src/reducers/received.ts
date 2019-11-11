import { ReceiveCommandAction, InvalidCommandAction, ReadyAction } from '../types/action'
import { RECEIVE_COMMAND, INVALID_COMMAND, READY } from '../actions/commands'
import { ReceivedState } from '../types/state'

const initialState: ReceivedState = ReceivedState.Ready

export default function received (state = initialState, action: ReceiveCommandAction|InvalidCommandAction|ReadyAction) {
    switch(action.type) {
        case RECEIVE_COMMAND:
            return ReceivedState.Success
        case INVALID_COMMAND:
            return ReceivedState.Failed
        case READY:
            return ReceivedState.Ready
        default:
            return state
    }
}
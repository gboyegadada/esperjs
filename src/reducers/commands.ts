import { CommandActionTypes } from '../types/action'
import { RECEIVE_COMMAND } from '../actions/commands'
import { CommandState } from '../types/state'

const initialState: CommandState[] = []

export default function commands (state = initialState, action: CommandActionTypes) {
    switch(action.type) {
        case RECEIVE_COMMAND:
            return [...state, action.command]
        default:
            return state
    }
}
import { CommandActionTypes } from '../types/action'
import { RECEIVE_COMMAND, CLEAR_COMMANDS, COM_BACK } from '../actions/commands'
import { CommandState } from '../types/state'

const initialState: CommandState[] = []

export default function commands (state = initialState, action: CommandActionTypes) {
    switch(action.type) {
        case RECEIVE_COMMAND:
            return action.command.command === COM_BACK ? state : [...state, action.command]
        case CLEAR_COMMANDS:
            return []
        default:
            return state
    }
}
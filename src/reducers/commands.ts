import { CommandActionTypes } from '../types/action'
import { COM_STOP, COM_TRACK_LEFT, COM_TRACK_RIGHT, COM_PAN_LEFT, COM_PAN_RIGHT, RECEIVE_COMMAND } from '../actions/commands'
import { CommandsState } from '../types/state'

const initialState: CommandsState = []

export default function commands (state = initialState, action: CommandActionTypes) {
    switch(action.type) {
        case COM_STOP:
        case COM_TRACK_LEFT:
        case COM_TRACK_RIGHT:
        case COM_PAN_LEFT:
        case COM_PAN_RIGHT:
            return [...state, action.type]
        case RECEIVE_COMMAND:
        default:
            return state
    }
}
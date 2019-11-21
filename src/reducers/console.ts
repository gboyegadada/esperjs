import { ConsoleActionTypes } from '../types/action'
import { ConsoleSate } from '../types/state'
import { CON_ECHO, CON_LOG, CON_CLEAR } from '../actions/console'

const initialState: ConsoleSate = {
  messages: [],
}

export default function received (state = initialState, action: ConsoleActionTypes) {
    switch(action.type) {
        case CON_LOG:
        case CON_ECHO:
            const { message: text, level } = action
            return { ...state, messages: [...state.messages, { text, level, timestamp: new Date().getTime() }] }
        case CON_CLEAR:
            return { messages: [] }
        default:
            return state
    }
}
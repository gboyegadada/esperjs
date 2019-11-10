import { ActionTypes } from "../types/action"
import { Dispatch } from "redux"

export function startListening () {
    return {
        type: ActionTypes.START_LISTENING,
    }
}

export function stopListening () {
    return {
        type: ActionTypes.STOP_LISTENING,
    }
}

export const handleStartListening = () => async (dispatch: Dispatch) => {
    try {
        dispatch(startListening())
    } catch (e) {
        dispatch(stopListening())
        alert('An error occured. Try again.')
    }
}
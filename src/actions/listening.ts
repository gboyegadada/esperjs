import { Dispatch } from "redux"
import SpeechRecognition from '../utils/speechRecognition'
import { START_LISTENING, STOP_LISTENING } from "../types/action"

export function startListening () {
    return {
        type: START_LISTENING,
    }
}

export function stopListening () {
    return {
        type: STOP_LISTENING,
    }
}

export const handleStartListening = () => async (dispatch: Dispatch) => {
    if (null == SpeechRecognition) return

    try {
        dispatch(startListening())

        SpeechRecognition.start()
    } catch (e) {
        dispatch(stopListening())
        alert('An error occured. Try again.')
    }
}

export const handleStopListening = () => async (dispatch: Dispatch) => {
    if (null == SpeechRecognition) return
    
    try {
        dispatch(stopListening())

        SpeechRecognition.stop()
    } catch (e) {
        alert('An error occured. Try again.')
    }
}
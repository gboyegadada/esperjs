import { ActionTypes } from "../types/action"

export function togglePower () {
    return {
        type: ActionTypes.TOGGLE_POWER,
    }
}
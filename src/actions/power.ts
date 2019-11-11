import { TogglePowerAction, TOGGLE_POWER } from "../types/action"

export function togglePower (): TogglePowerAction {
    return {
        type: TOGGLE_POWER,
    }
}
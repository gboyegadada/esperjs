export const COM_NUDGE_LEFT = 'COM_NUDGE_LEFT'
export const COM_NUDGE_RIGHT = 'COM_NUDGE_RIGHT'
export const COM_NUDGE_UP = 'COM_NUDGE_UP'
export const COM_NUDGE_DOWN = 'COM_NUDGE_DOWN'
export const COM_NUDGE_IN = 'COM_NUDGE_IN'
export const COM_NUDGE_OUT = 'COM_NUDGE_OUT'
export const SET_NUDGE_INTERVAL = 'SET_NUDGE_INTERVAL'

export function setNudgeInterval (interval: NodeJS.Timeout) {
    return {
        type: SET_NUDGE_INTERVAL,
        interval,
    }
}
export const SET_MOVE_INTERVAL = 'SET_MOVE_INTERVAL'
export const COM_MOVE_LEFT = 'COM_MOVE_LEFT'
export const COM_MOVE_RIGHT = 'COM_MOVE_RIGHT'
export const COM_MOVE_UP = 'COM_MOVE_UP'
export const COM_MOVE_DOWN = 'COM_MOVE_DOWN'
export const COM_NUDGE_LEFT = 'COM_NUDGE_LEFT'
export const COM_NUDGE_RIGHT = 'COM_NUDGE_RIGHT'
export const COM_NUDGE_UP = 'COM_NUDGE_UP'
export const COM_NUDGE_DOWN = 'COM_NUDGE_DOWN'
export const COM_CENTER = 'COM_CENTER'

export function setMoveInterval (interval: NodeJS.Timeout) {
    return {
        type: SET_MOVE_INTERVAL,
        interval,
    }
}
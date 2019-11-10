export enum ActionTypes {
    TOGGLE_POWER = 'TOGGLE_POWER',

    START_LISTENING = 'START_LISTENING',
    STOP_LISTENING = 'STOP_LISTENING',
}

export interface BaseAction {
    type: ActionTypes
}

export interface TogglePowerAction extends BaseAction {
    type: ActionTypes.TOGGLE_POWER;
}

export interface StartListeningAction extends BaseAction {
    type: ActionTypes.START_LISTENING;
}

export interface StopListeningAction extends BaseAction {
    type: ActionTypes.STOP_LISTENING;
}
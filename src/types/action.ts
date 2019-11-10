export enum ActionTypes {
    TOGGLE_POWER = 'TOGGLE_POWER',
}

export interface BaseAction {
    type: ActionTypes
}

export interface TogglePowerAction extends BaseAction {
    type: ActionTypes.TOGGLE_POWER;
}
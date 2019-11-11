import { combineReducers } from 'redux'

import power from '../reducers/power'
import commands from '../reducers/commands'
import received from '../reducers/received'

const rootReducer = combineReducers({ 
    power, commands, received
})

export default rootReducer
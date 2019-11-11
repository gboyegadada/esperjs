import { combineReducers } from 'redux'

import power from '../reducers/power'
import commands from '../reducers/commands'

const rootReducer = combineReducers({ 
    power, commands
})

export default rootReducer
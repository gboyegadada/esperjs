import { combineReducers } from 'redux'

import power from '../reducers/power'
import commands from '../reducers/commands'
import received from '../reducers/received'
import confirm from '../reducers/confirm'
import location from '../reducers/location'

const rootReducer = combineReducers({ 
    power, commands, location, received, confirm
})

export default rootReducer
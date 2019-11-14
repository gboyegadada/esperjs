import { combineReducers } from 'redux'

import power from '../reducers/power'
import commands from '../reducers/commands'
import received from '../reducers/received'
import confirm from '../reducers/confirm'
import location from '../reducers/location'
import zoom from '../reducers/zoom'
import nudge from '../reducers/nudge'
import uploader from '../reducers/uploader'

const rootReducer = combineReducers({ 
    power, commands, location, zoom, nudge, uploader, received, confirm
})

export default rootReducer
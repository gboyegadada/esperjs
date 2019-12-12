import React from 'react'
import { MdPowerSettingsNew } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/App.css'

import { AppState } from '../types/state'
import { togglePower } from '../actions/power'
import Console from './Console'
import Monitor from './Monitor'
import Browse from './Browse'

export default function App () {
      const power = useSelector((state: AppState) => state.power)
      const dispatch = useDispatch()

      return (
        <div className="App vw-75 m-center">
          <header className="App-header mb-4 pt-4">
            
            <div className='d-flex flex-row justify-content-between w-100 bb pb-1'>
              <div className={`d-flex flex-row justify-content-start btn btn-power ${power.on && 'on'}`} onClick={() => dispatch(togglePower())}>
                <MdPowerSettingsNew size={30} />
                <span className='ml-1'>{power.on ? 'ON' : 'OFF'}</span>
              </div>

              <Browse />
            </div>
            <Monitor />
            { power.on && <Console /> }
          </header>
        </div>
      )
}

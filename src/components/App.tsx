import React, { Component } from 'react'
import { MdPowerSettingsNew, MdEject } from 'react-icons/md'
import { AiFillSave } from 'react-icons/ai'
import { connect } from 'react-redux'
import '../styles/App.css'

import { PowerState, UploaderState } from '../types/state'
import { Dispatch } from 'redux'
import { togglePower } from '../actions/power'
import Console from './Console'
import Prompt from './Prompt'
import Monitor from './Monitor'
import { browse, eject } from '../actions/uploader'

interface Props {
  power: PowerState
  uploader: UploaderState
  dispatch: Dispatch
}

export class App extends Component<Props> {

  render() {
      const { power, uploader, dispatch } = this.props

      return (
        <div className="App vw-75 m-center">
          <header className="App-header mb-4 pt-4">
            
            <div className='d-flex flex-row justify-content-between w-100 bb pb-1'>
              <div className={`d-flex flex-row justify-content-start btn btn-power ${power.on && 'on'}`} onClick={() => dispatch(togglePower())}>
                <MdPowerSettingsNew size={30} />
                <span className='ml-1'>{power.on ? 'ON' : 'OFF'}</span>
              </div>

              {power.on && !uploader.file && <div className={`d-flex flex-row justify-content-around btn btn-upload`} onClick={() => dispatch(browse())}>
                <span className='mr-1'>UPLOAD</span>
                <AiFillSave size={25} />
              </div>}

              {power.on && uploader.file && <div className={`d-flex flex-row justify-content-around btn btn-eject`} onClick={() => dispatch(eject())}>
                <span className='mr-1'>EJECT</span>
                <MdEject size={25} />
              </div>}
            </div>
            <Prompt />
            <Monitor />
            { power.on && <Console /> }
          </header>
        </div>
      )
  }
}

export default connect(({ power, uploader, dispatch }: { power: PowerState, uploader: UploaderState, dispatch: Dispatch }) => ({ power, uploader, dispatch }))(App)


import React, { Component } from 'react';
import { MdPowerSettingsNew } from 'react-icons/md'
import { connect } from 'react-redux'
import '../styles/App.css';

import { PowerState } from '../types/state'
import { Dispatch } from 'redux';
import { togglePower } from '../actions/power';
import Console from './Console';
import Prompt from './Prompt';
import Monitor from './Monitor';

interface Props {
  power: PowerState
  dispatch: Dispatch
}

export class App extends Component<Props> {

  togglePower = (power: PowerState) => {
        this.props.dispatch(togglePower())
  }

  render() {
      const { power }: { power: PowerState } = this.props

      return (
        <div className="App vw-75 m-center">
          <header className="App-header mb-4 pt-4">
            
            <div className='d-flex flex-row justify-content-between w-100 bb pb-1'>
              <div className={`d-flex flex-row justify-content-start btn btn-power ${power.on && 'on'}`} onClick={() => this.togglePower(power)}>
                <MdPowerSettingsNew size={30} />
                <span className='ml-1'>{power.on ? 'ON' : 'OFF'}</span>
              </div>
            </div>
            <Prompt />
            <Monitor />
            { power.on && <Console /> }
          </header>
        </div>
      )
  }
}

export default connect(({ power, dispatch }: { power: PowerState, dispatch: Dispatch }) => ({ power, dispatch }))(App)


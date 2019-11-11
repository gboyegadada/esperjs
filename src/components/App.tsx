import React, { Component } from 'react';
import { MdPowerSettingsNew } from 'react-icons/md'
import { connect } from 'react-redux'
import '../styles/App.css';

import { PowerState } from '../types/state'
import { Dispatch } from 'redux';
import { togglePower } from '../actions/power';
import SpeechRecognition from '../utils/speechRecognition'
import Console from './Console';

interface Props {
  power: PowerState
  dispatch: Dispatch
}

class App extends Component<Props> {

  togglePower = (power: PowerState) => {
    if (null === SpeechRecognition) return
    
    power.on 
        // ESPER is **ON** and is about to go **OFF** 
        // so stop listening...
        ? SpeechRecognition.stop()
        
        // ESPER is **OFF** and is about to come **ON** 
        // so start listening...
        : SpeechRecognition.start()

        this.props.dispatch(togglePower())
  }

  render() {
      const { power }: { power: PowerState } = this.props

      return (
        <div className="App">
          <header className="App-header">
            <div className={`d-flex flex-row justify-content-start btn btn-power ${power.on && 'on'}`} onClick={() => this.togglePower(power)}>
              <MdPowerSettingsNew size={30} />
              <span className='ml-1'>{power.on ? 'ON' : 'OFF'}</span>
            </div>
            <Console />
          </header>
        </div>
      )
  }
}

export default connect(({ power, dispatch }: { power: PowerState, dispatch: Dispatch }) => ({ power, dispatch }))(App)


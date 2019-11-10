import React, { Component } from 'react';
import { MdPowerSettingsNew } from 'react-icons/md'
import { connect } from 'react-redux'
import '../styles/App.css';

import { PowerState } from '../types/state'
import { Dispatch } from 'redux';
import { togglePower } from '../actions/power';

interface Props {
  power: PowerState
  dispatch: Dispatch
}

class App extends Component<Props> {

  togglePower = () => {
    this.props.dispatch(togglePower())
  }

  render() {
      const { power }: { power: PowerState } = this.props

      return (
        <div className="App">
          <header className="App-header">
            <div className={`d-flex flex-row justify-content-start btn btn-power ${power.on && 'on'}`} onClick={this.togglePower}>
              <MdPowerSettingsNew size={30} />
              <span className='ml-1'>{power.on ? 'ON' : 'OFF'}</span>
            </div>
            <p>
              <code>&nbsp;</code>
            </p>
          </header>
        </div>
      )
  }
}

export default connect(({ power, dispatch }: { power: PowerState, dispatch: Dispatch }) => ({ power, dispatch }))(App)


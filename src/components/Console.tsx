import React, { Component } from 'react';
import { CommandState, PowerState } from '../types/state';
import { connect } from 'react-redux';
import Indicator from './Indicator';

interface Props {
    commands: CommandState[]
    power: PowerState
}

export function Console ({ commands, power }: Props) {
    return (
        <div className='console w-100 pt-2 pb-1 mt-2'>
            <Indicator successClassName='led led-success' dangerClassName='led led-danger'/>
            <ul className={`d-flex flex-col justify-content-start ${power.on ? '' : 'hide' }`}>
              <li>Say "shut down" and then say "okay" to confirm or "cancel" to abort...</li>
              {commands.map((com, k) => (
                <li key={k}>{com.command}</li>
              ))}
            </ul>
        </div>
        )
}

export default connect(({ commands, power }: { commands: CommandState[], power: PowerState }) => ({ commands, power }))(Console)